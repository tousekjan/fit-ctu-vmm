using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VMMBackend.Models;

namespace VMMBackend.Helpers
{
    public static class Reranker
    {
        private static readonly Random random = new Random();
        
        public static IEnumerable<PhotoModel> GetReranked(List<PhotoModel> photos, RerankingParameters parameters)
        {
            var rerankedPhotos = new List<PhotoModel>(photos);

            foreach (var photo in rerankedPhotos)
            {
                photo.Score = CalculateScore(photo, parameters);
            }

            return rerankedPhotos.OrderByDescending(x => x.Score);
        }

        public static IEnumerable<PhotoModel> GetRerankedParallel(List<PhotoModel> photos, RerankingParameters parameters)
        {
            var rerankedPhotos = new List<PhotoModel>(photos);

            Parallel.ForEach(rerankedPhotos, 
                new ParallelOptions { MaxDegreeOfParallelism = 4 }, 
                (photo) =>
                {
                    photo.Score = CalculateScore(photo, parameters);
                });

            return rerankedPhotos.OrderByDescending(x => x.Score);
        }

        private static double CalculateScore(PhotoModel photo, RerankingParameters parameters)
        {
            double totalWeight = 0;

            double descriptionScore = 0;
            if (parameters.DescriptionWeight > 0)
            {
                totalWeight += parameters.DescriptionWeight;
                double maxDescriptionDistance = 1000;
                double descriptionDistanceNormalized = GetEditDistance(photo.Description, parameters.Description) / maxDescriptionDistance;
                descriptionScore = descriptionDistanceNormalized > 1 ? 0 : 1 - descriptionDistanceNormalized;
            }

            double uploadedScore = 0;
            if (parameters.UploadedWeight > 0)
            {
                totalWeight += parameters.UploadedWeight;
                double maxUploadedDistance = ((DateTimeOffset)new DateTime(2004, 2, 10)).ToUnixTimeSeconds();
                double uploadDistanceNormalized = Math.Abs(((DateTimeOffset)photo.DateUploaded).ToUnixTimeSeconds() - parameters.Uploaded) / maxUploadedDistance;
                uploadedScore = uploadDistanceNormalized > 1 ? 0 : 1 - uploadDistanceNormalized;
            }

            double timeScore = 0;
            if (parameters.TimeWeight > 0)
            {
                totalWeight += parameters.TimeWeight;
                double maxTimeDistance = 43200;
                double timeDistanceNormalized = GetTimeDistance(photo.DateTaken.TimeOfDay, UnixTimeStampToDateTime(parameters.Time).TimeOfDay) / maxTimeDistance;
                timeScore = timeDistanceNormalized > 1 ? 0 : 1 - timeDistanceNormalized;
            }

            double widthScore = 0;
            if (parameters.WidthWeight > 0)
            {
                totalWeight += parameters.WidthWeight;
                double maxWidthDistance = 6144;
                double widthDistanceNormalized = Math.Abs(photo.Width - parameters.Width) / maxWidthDistance;
                widthScore = widthDistanceNormalized > 1 ? 0 : 1 - widthDistanceNormalized;
            }

            double likesScore = 0;
            if (parameters.LikesWeight > 0)
            {
                totalWeight += parameters.LikesWeight;
                double maxLikesDistance = 10000;
                double likesDistanceNormalized = Math.Abs(photo.Likes - parameters.Likes) / maxLikesDistance;
                likesScore = likesDistanceNormalized > 1 ? 0 : 1 - likesDistanceNormalized;
            }

            double geoScore = 0;
            if (parameters.GeoWeight > 0)
            {
                totalWeight += parameters.GeoWeight;
                double maxGeoDistance = 20036;
                double geoDistanceNormalized = GetGreatCircleDistance(photo.Latitude, photo.Longitude, parameters.Latitude, parameters.Longtitude) / maxGeoDistance;
                geoScore = geoDistanceNormalized > 1 ? 0 : 1 - geoDistanceNormalized;
            }

            if (totalWeight == 0)
                return 0;

            return ((descriptionScore * parameters.DescriptionWeight) +
                   (uploadedScore * parameters.UploadedWeight) +
                   (timeScore * parameters.TimeWeight) +
                   (widthScore * parameters.WidthWeight) +
                   (likesScore * parameters.LikesWeight) +
                   (geoScore * parameters.GeoWeight)) / totalWeight;
        }

        private static double GetTimeDistance(TimeSpan timeOfDay1, TimeSpan timeOfDay2)
        {
            double distance = Math.Abs(timeOfDay1.Subtract(timeOfDay2).TotalSeconds);

            return distance > TimeSpan.FromHours(12).TotalSeconds
                ? TimeSpan.FromHours(24).TotalSeconds - distance
                : distance;
        }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }

        private static int GetEditDistance(string first, string second)
        {
            return GetEditDistance(first, second, first.Length, second.Length);
        }

        private static int GetEditDistance(string first, string second, int lengthFirst, int lengthSecond)
        {
            int[,] table = new int[lengthFirst + 1, lengthSecond + 1];

            for (int i = 0; i <= lengthFirst; i++)
            {
                for (int j = 0; j <= lengthSecond; j++)
                {
                    if (i == 0)
                    {
                        table[i, j] = j;
                    }

                    else if (j == 0)
                    {
                        table[i, j] = i;
                    }

                    else if (first[i - 1] == second[j - 1])
                    {
                        table[i, j] = table[i - 1, j - 1];
                    }

                    else
                    {
                        table[i, j] = 1 + Math.Min(table[i, j - 1],
                            Math.Min(table[i - 1, j],
                            table[i - 1, j - 1]));
                    }
                }
            }

            return table[lengthFirst, lengthSecond];
        }

        private static double GetGreatCircleDistance(double lat1, double lon1, double lat2, double lon2)
        {
            double phi1 = DegreesToRadians(lat1);
            double lambda1 = DegreesToRadians(lon1);
            double phi2 = DegreesToRadians(lat2);
            double lambda2 = DegreesToRadians(lon2);

            double centralAngle = Math.Acos(
                Math.Sin(phi1) * Math.Sin(phi2) + 
                Math.Cos(phi1) * Math.Cos(phi2) * Math.Cos(lambda1 - lambda2));

            int meanEarthRadius = 6371;
            double distance = centralAngle * meanEarthRadius;

            return distance;
        }

        private static double DegreesToRadians(double alpha)
        {
            return alpha * Math.PI / 180;
        }
    }
}

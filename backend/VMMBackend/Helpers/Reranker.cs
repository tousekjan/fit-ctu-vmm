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
            //Calculate score for every photo
            //Order photos by score
            //bigger distance -> lower score
            //score = (Score1 * Weight1 / Normalization1 + ... + ScoreN * WeightN / NormalizationN)

            var rerankedPhotos = new List<PhotoModel>(photos);

            foreach (var photo in rerankedPhotos)
            {
                photo.Score = CalculateScore(photo, parameters);
            }

            return rerankedPhotos.OrderByDescending(x => x.Score);
        }

        private static double CalculateScore(PhotoModel photo, RerankingParameters parameters)
        {
#warning implementovat vypocet skore
            return Math.Round(random.NextDouble(), 2);
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

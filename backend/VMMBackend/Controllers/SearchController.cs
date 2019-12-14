using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VMMBackend.Helpers;
using VMMBackend.Models;

namespace VMMBackend.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public ActionResult<SearchResponse> Get(
            string text, string description, int descriptionWeight, 
            long uploaded, int uploadedWeight,
            long time, int timeWeight, int width,
            int widthWeight, int likes, int likesWeight, 
            double lat, double lon, int geoWeight)
        {
            var client = new FlickrClient();
            var photos = client.Search(text).ToList();

            var rerankingParameters = new RerankingParameters
            {
                Text = text,
                Description = description,
                DescriptionWeight = descriptionWeight,
                Uploaded = uploaded,
                UploadedWeight = uploadedWeight,
                Time = time,
                TimeWeight = timeWeight,
                Width = width,
                WidthWeight = widthWeight,
                Likes = likes,
                LikesWeight = likesWeight,
                Latitude = lat,
                Longtitude = lon,
                GeoWeight = geoWeight
            };

            var stopWatch = Stopwatch.StartNew();
            var rerankedPhotos = Reranker.GetRerankedParallel(photos, rerankingParameters).ToList();
            stopWatch.Stop();

            Console.WriteLine($"GetReranked took: {stopWatch.ElapsedMilliseconds} Milliseconds");


            return new SearchResponse
            {
                RarankingTime = stopWatch.ElapsedMilliseconds,
                Original = photos,
                Reranked = rerankedPhotos,
            };
        }
    }
}
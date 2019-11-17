using System;
using System.Collections.Generic;
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
            string text, long uploaded, int uploadedWeight,
            long time, int timeWeight, int width,
            int widthWeight, double lat, double lon, int geoWeight)
        {
            var client = new FlickrClient();
            var photos = client.Search(text, lat, lon);

            var rerankingParameters = new RerankingParameters
            {
                Text = text,
                Uploaded = uploaded,
                UploadedWeight = uploadedWeight,
                Time = time,
                TimeWeight = timeWeight,
                Width = width,
                WidthWeight = widthWeight,
                Latitude = lat,
                Longtitude = lon,
                GeoWeight = geoWeight
            };

            var rerankedResults = new List<string>();// Reranker.GetReranked(photos, rerankingParameters);

            var response = new SearchResponse
            {
                Original = photos.Select(x => x.WebUrl),
                Reranked = rerankedResults
            };

            return response;
        }
    }
}
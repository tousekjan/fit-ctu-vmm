using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlickrNet;
using VMMBackend.Models;

namespace VMMBackend.Helpers
{
    public class FlickrClient
    {
        private const string API_KEY = "c8c9b5c092b16e4aba91bb26815b5a52";
        private const string SECRET = "e1d2b3ee79f070e2";

        private readonly Flickr _flickr;
        public FlickrClient()
        {
            _flickr = new Flickr(API_KEY, SECRET);
        }

        public IEnumerable<PhotoModel> Search(string text, double lat, double lon)
        {
            PhotoSearchOptions options = new PhotoSearchOptions
            {
                HasGeo = true,
                Text = text,
                Extras = PhotoSearchExtras.DateUploaded | 
                         PhotoSearchExtras.DateTaken | 
                         PhotoSearchExtras.Geo | 
                         PhotoSearchExtras.Description | 
                         PhotoSearchExtras.Views |
                         PhotoSearchExtras.OriginalDimensions
            };

            PhotoCollection response = _flickr.PhotosSearch(options);

            return response.Select(x => new PhotoModel
            {
                PhotoId = x.PhotoId,
                DateTaken = x.DateTaken,
                DateUploaded = x.DateUploaded,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                WebUrl = x.MediumUrl,
                Description = x.Description,
                Width = x.OriginalWidth
            });
        }
    }
}

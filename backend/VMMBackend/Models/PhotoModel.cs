using System;

namespace VMMBackend.Models
{
    public class PhotoModel
    {
        public string PhotoId { get; set; }
        public string WebUrl { get; set; }
        public DateTime DateTaken { get; set; }
        public DateTime DateUploaded { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}

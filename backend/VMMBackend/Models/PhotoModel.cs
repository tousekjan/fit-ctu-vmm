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
        public string Description { get; set; }
        public int Width { get; set; }
        public double Score { get; set; }
    }
}

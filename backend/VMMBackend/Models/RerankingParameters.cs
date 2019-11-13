namespace VMMBackend.Models
{
    public class RerankingParameters
    {
        public string Text { get; set; }
        public long Uploaded { get; set; }
        public int UploadedWeight { get; set; }
        public long Time { get; set; }
        public int TimeWeight { get; set; }
        public int Width { get; set; }
        public int WidthWeight { get; set; }
        public double Latitude { get; set; }
        public double Longtitude { get; set; }
        public int GeoWeight { get; set; }
    }
}

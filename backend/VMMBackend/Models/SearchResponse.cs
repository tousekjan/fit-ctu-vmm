using System.Collections.Generic;

namespace VMMBackend.Models
{
    public class SearchResponse
    {
        public IEnumerable<PhotoModel> Original { get; set; }
        public IEnumerable<PhotoModel> Reranked { get; set; }
    }
}

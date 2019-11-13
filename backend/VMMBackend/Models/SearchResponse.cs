using System.Collections.Generic;

namespace VMMBackend.Models
{
    public class SearchResponse
    {
        public IEnumerable<string> Original { get; set; }
        public IEnumerable<string> Reranked { get; set; }
    }
}

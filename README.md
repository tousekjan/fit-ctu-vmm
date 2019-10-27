# Flicker Advanced Search

MI-VMM Flicker Advanced Search

## API:

request:
http://localhost:8080/search/?text=car
 * lat (-77.0364)
 * lon (38.8951)
 * geo_weight <0,100>
 * upload_date (1571728392)
 * upload_date_weight <0,100>
 * weight <0,5000>
 * weight_weight <0,100>

response (JSON - 200 OK || 400 Bad request):
{
    original: 
    [
        "https://flicker.image12316543.jpg",
        "https://flicker.image1231654.jpg"
    ],
    reranked: {
        "https://flicker.image12316543.jpg",
        "https://flicker.image1231654.jpg"
    }
}


description:
- geo gps (pouzijeme hasGeo), specialni porovnavani (viz wiki), ktere uvazuje zakriveni zeme
- date a dateWeight (upload)
- velikost - sirka (porovnavat s puvodni)

- orientace (na sirku, na vysku, ctverec)?

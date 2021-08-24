# Flick++

A school project for course MI-VMM for advanced search on Flickr.

## How to run backend web API:
* install .NET Core 3.1
* go to folder backend/VMMBackend, command `cd backend/VMMBackend`
* run `dotnet run`
* web API running on http://localhost:8000
* for full experience also run frontend

## How to run fronted web application:

* install npm and yarn
* go to folder web-app, command on Linux: `cd web-app`
* install npm packages `yarn`, alternatively `npm install`
* run `yarn dev`, alternatively `npm run dev`
* web-app running on `http://localhost:8000`
* (for searching is necessary tu run backend on http://localhost:8080 and implement API - see below)

### Run frontend with mock of backend
* run `yarn dev:mock`, alternatively `npm run dev:mock`


## API design and description:

request - real example:
`http://localhost:8080/search?text=car&uploaded=1572274770&uploadedWeight=80&width=1000&widthWeight=28&lat=46.90031249999999&lon=-96.800927&geoWeight=67`
 - text (string not null or empty)
 - description (string not null or empty)
 - descriptionWeight <0,100>
 - uploaded (example: 1571728392 - timestamp)
 - uploadedWeight <0,100>
 - time (date time of photo take; example: 1571728392 - timestamp)
 - timeWeight <0,100>
 - width <0,5000>
 - widthWeight <0,100>
 - likes
 - likesWeight <0,100>
 - lat (-77.0364)
 - lon (38.8951)
 - geoWeight <0,100>

 Response: (JSON - 200 OK || 400 Bad request)
```json
response: 
{
    original: 
    [
        {
            webUrl: "https://Flickr.image1231654.jpg",
            text: "car",
            description: "Car on road",
            uploaded: 1571728392,
            time: 1571728392,
            width: 2000,
            likes: 1200,
            lat: -77.0364,
            lon: 38.8951
        },
         {
            webUrl: "https://Flickr.image1231653.jpg",
            text: "car",
            description: "My car",
            uploaded: 1571728392,
            time: 1571728392,
            width: 2000,
            likes: 1200,
            lat: -77.0364,
            lon: 38.8951
        }
    ],
    reranked: 
    [
        {
            url: "https://Flickr.image12316543.jpg",
            score: "0.95",
            text: "car",
            description: "Car on road",
            uploaded: 1571728392,
            time: 1571728392,
            width: 2000,
            likes: 1200,
            lat: -77.0364,
            lon: 38.8951
        },
         {
            url: "https://Flickr.image1231654.jpg",
            score: "0.92",
            text: "car",
            description: "My car",
            uploaded: 1571728392,
            time: 1571728392,
            width: 2000,
            likes: 1200,
            lat: -77.0364,
            lon: 38.8951
        }
    ],
}
```

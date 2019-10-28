# Flick++

A school project for course MI-VMM for advanced search on Flickr.


## How to run fronted web application:

 - install npm and yarn
 - go to folder web-app, command on Linux: `cd web-app`
 - install npm packages `yarn`, alternatively `npm install`
 - run `yarn dev`, alternatively `npm run dev`
 - web-app running on `http://localhost:8000`
 - (for searching is necessary tu run backend on http://localhost:8080 and implement API - see below)


## API design and description:

request - real example:
`http://localhost:8080/search?text=car&uploaded=1572274770&uploadedWeight=80&width=1000&widthWeight=28&lat=46.90031249999999&lon=-96.800927&geoWeight=67`
 - text (string not null or empty)
 - uploaded (example: 1571728392 - timestamp)
 - uploadedWeight <0,100>
 - width <0,5000>
 - widthWeight <0,100>
 - lat (-77.0364)
 - lon (38.8951)
 - geoWeight <0,100>

response (JSON - 200 OK || 400 Bad request):
{
    original: 
    [
        "https://Flickr.image12316543.jpg",
        "https://Flickr.image1231654.jpg"
    ],
    reranked: {
        "https://Flickr.image12316543.jpg",
        "https://Flickr.image1231654.jpg"
    }
}


poznamky:
- geo gps (pouzijeme hasGeo), specialni porovnavani (viz wiki), ktere uvazuje zakriveni zeme
- uploaded a uploadedWeight (datum uploadu fotografie)
- velikost - sirka (porovnavat s puvodni)

zatim neimplementovano, ale napady:
- cas porizeni (00:00 - 23:59) - uzivatel by tak mohl vybrat, ze chce napr fotku, vyfocenou v poledne
- orientace (na sirku, na vysku, ctverec)

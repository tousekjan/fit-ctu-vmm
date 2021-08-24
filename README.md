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
# Flickr - matadata-based reranking
## Project description
The goal of the project is to create a web application to enhance image search on [flickr.com](https://flickr.com/). Flickr provides an API through which image search can be simulated within its web interface. For each image found, there is a set of metadata that we use. Our application thus allows searching based on a number of parameters in addition to the usual keyword search. It is even possible to set a weight to individual parameters. The output consists of sorted images according to the best possible score (obtained on the basis of the individual input parameters). 

## Input
The input is handled by the web application interface, where, in addition to the keyword, some other search parameters can be entered; each such additional parameter can be given a weight (from 1 to 100). The specific extension parameters are:
* Image description
* Date uploaded
* Time of capture
* Image width
* Number of Likes
* Location

## Output
The output displayed within the web application contains 2 lists of photos. The first - left list shows images that are searched only by keyword. The right list shows images that are sorted based on the selected input parameters. For these images, a score (in percentage) is additionally displayed - calculated based on the approximation to the selected input parameters. Furthermore, after hovering over these images, meta information (Image description, Upload date...) is displayed.

## Architecture
The solution chosen is a client-server architecture. The client application is implemented using React technology. The server part is implemented using .Net Core technology. Client and server communicate with each other through one REST API endpoint using json format.

## Implementation
### Client
The React framework with the Ant design library was used to develop the client side. Ant design helped with predefined components like DatePicker, TimePicker, Input, Button etc.

#### Address finder
One of the biggest challenges was to create an address finder and whisperer. The Google geo suggestion API was used for this problem - via the react-geosuggest library. The way it works is that the user starts typing in an address (in any language, using diacritics or not) the Google API returns the relevant address. It works in a very similar way to a user searching on maps.google.com.
After clicking on the selected address, latitude and longitude parameters can be retrieved. These parameters are sent to the server and then serve as input to the flickr API.

#### Photo display
After sending input parameters to the server, the client part receives a response in the form of two arrays of objects. Each object represents one photo. The object contains the metadata and the url to the photo. These urls are used to display the photos.
The photos are displayed using two lists. The first - left list shows the images that are searched only by keyword. The right list shows images that are sorted based on the selected input parameters. For these images, a score (in percentage) is also displayed - calculated based on the approximation to the selected input parameters. Furthermore, by hovering over these images, meta information (Image description, Upload date...) is displayed.

### Server
For the implementation of the backend part we decided to use the C# language and the .NET Core framework.

#### Used libraries
Of particular note is the [FlickrNet](https://www.nuget.org/packages/FlickrNet) library, which facilitates communication directly with the flickr API.

### Requirements
To run the backend, you need to have the [.NET Core SDK or .NET Core Runtime](https://dotnet.microsoft.com/download) installed.

## Example output
![web-app-example](https://user-images.githubusercontent.com/26005077/130588740-daa2ead3-f8d6-4e11-a78a-4da5a0761f23.png)

In the picture you can see the upper input section - where the individual search parameters and their weight are entered.
After loading, the images are displayed. In the left part, the search is only by keyword. In the right part, the already sorted images can be observed - the top left is the most relevant. For each sorted image, its score (in percentage from 1 to 100) is displayed in a decent style on the bottom right. 

When you hover over an image, a pop-up modal is displayed showing the individual meta information - this is for exploring and checking the results.
In this particular case, the user is searching for images of bridges, and is most interested in the location, namely in Prague. He also wants to see bridges at sunset, for example, and therefore chooses the time the photo was taken at 20:00. Then he selects the number of Likes, which can be indicative of the quality of the photo. The photos in the list on the right are sorted according to these parameters and their weights.

## Experiments
### Parallelization of score calculation
Calculating the score for each image is a task whose calculation can be parallelized very well.
In this test, for several different query assignments, we took 10 measurements of the speed each time and averaged the results. From the following graph we can see that as the number of threads used increases, the time required to compute the scores for all images decreases.

![score-computation-speed](https://user-images.githubusercontent.com/26005077/130589031-475480c7-1cc8-4b2c-8816-02df21b118ca.png)

### Calculating the edit distance
The chosen algorithm for calculating the edit distance of strings m and n has a linear time complexity of O(m + n). We decided to experimentally check if this holds. All parameters remain constant, only the length of Description, which we generate as a random string, changes. The computation is performed for 20 selected searches and the results are averaged. The graph shows that the computation time increases linearly with the size of Description with slight variations.

![score-computation-by-description-length](https://user-images.githubusercontent.com/26005077/130589253-824b0d61-4fe0-4053-b3d7-7662b5f6d5a2.png)

## Discussion
Although the score calculation is very fast (in the order of tens of milliseconds), especially when using multiple threads, the user waits more than 2 seconds for the result. This is due to the slow response of the Flickr API and the way the FlickrNet library works. Getting the photos, including their metadata takes most of the time to get the result. For real use, this time would need to be reduced, for example, by a custom implementation of a library to communicate with the Flickr API that retrieves the details of all retrieved photos in parallel.

## Conclusion
The result of our work is a fully functional application that allows to search and, more importantly, to rank images retrieved from the Flickr API according to specified parameters and their weights. 

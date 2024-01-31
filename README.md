# 🗾 ArcGIS SDK Javascript (AMD)
## ⛰️ Shetland Isles Topography App ⛰️

<img width="600" alt="Screenshot of application" src="https://github.com/MDW-94/arcgis_map/assets/138756503/93f9e320-ddba-4e12-bb80-a5e3db7b1a62">
<br></br>

<span>
  <img width="200" alt="Screenshot 2024-01-31 at 14 32 33" src="https://github.com/MDW-94/arcgis_map/assets/138756503/3181a9e4-286b-4191-94ef-333cd37d825e">

  <img width="200" alt="Screenshot of application" src="https://github.com/MDW-94/arcgis_map/assets/138756503/2db4d276-7be0-48fd-99d6-05571e3089b4">
  
  <img width="200" alt="Screenshot of application" src="https://github.com/MDW-94/arcgis_map/assets/138756503/4a45449f-7236-4f8e-b117-77c9de1f9827">
</span>


## Description
ArcGIS Map application showcasing native ArcGIS SDK for Javascript features plus customised widgets developed with HTML and Javascript. A map of the Shetland Isles is displayed with data layers taken from the Esri Living Atlas data collection. The data layer displayed here shows the different slop gradients in the topography of the Shetlands - this is displayed through a swipe widget that the user can control.

The application uses a index.html, the ArcGIS JS API and a script.js. 

Other features include:
- an innate ArcGIS basemap toggle module plus a customised one I developed to pull in a water colour map (found through the Living Atlas data collection)

- a legend widget describing the feature alyer being paplied to the map ia the swipe widget - this includes information about the data layer plus authorship
  
- a 2D/3D toggle allowing the user to switch between a 2D Vector Map and a 3D SceneView (the scene is a prebuilt 3D GIS scene found whilst browsing through data layer on the Living Atlas site). The scene is a collection of Neolightic sites that can be found in the Shetland isles.

- a data selection widget - this feature will allow the user to be able to select from a collection of different data feature layers that portray different topographic, meteorological and environmental data about the Shetlands. These feature layers will be rendered within the swipe widget to allow the user to remove the feature layer temporarily whilst navigating through the basemap - under construction - 

Notes
- See URL for deployed application (github pages)
- For ArcGIS ES Module Build tutorial & example go to https://github.com/MDW-94/arcgis_demo

<img width="600" alt="Screenshot 2024-01-31 at 13 19 58" src="https://github.com/MDW-94/arcgis_map/assets/138756503/7668569d-aea3-4298-b028-041788f3b584">

## Setup & Installation
- pull the project in a chosen directory
- find index.html file
- right click
- select show in browser
- refresh to update or edit 

### Tutorial

In this section I'll show you how to get started with a basic ArcGIS Map SDK Javscript application. This is a lightweight, standalone version which can be deployed via Github pages. 

To see an emmbedded ArcGIS Map within a Vite React framework go to this <a href="https://github.com/MDW-94/arcgis_demo">repository</a> - where you can follow the instructions step-by-step on how to use ES Module builds with ArcGIS. 

(URL: https://github.com/MDW-94/arcgis_demo)

Getting started:

```bash
mkdir your_directory
cd your_directory
```

Note: You can install the AMD modules through npm i - the documentation will tell you this is an option but your app can fetch the AMD modules from the CDN (Content Delivery Network) without this step.

```bash
npm i arcgis-js-api
```

Afterwards we're going to create a basic index.html file, this will be the face/front of our application:

```bash
touch index.html
```

The setup of this index.html document will be relatively straightforward and include

```bash
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="description" content="Our ArcGIS Map Application - AMD">
    <title>ArcGIS Map</title>
  </head>
  <body>
      <!-- we will fill this section soon! -->
  </body>
</html>
```

With our basic index.html setup done we can move onto the key features which will run our ArcGIS app alongside how we might begin to customise these features:

#### ArcGIS CSS
ArcGIS Map application pull CSS configurations from the ArcGIS CDN. These CSS features allow us to customise the widgets inside our map application - these include buttons, swipes and any other UI that we might include.

We need to pull these CSS parameters into our index.html:

```bash
# index.html
<!--inside head tag-->

  <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/dark/main.css" type="text/css">

<!--inside head tag-->
```

We declare a <link> tag inside our <head> tag and referncing the URL shown above - there is an alternative light themed option for those who want to select a different display option.

Note: CSS and the AMD modules will select to inlclude in our application are pulled from the ArcGIS CDN at runtime of the application. This is usual as it means all the dependcies for our application are not stored locally, optimising our application and keeping it lightweight. You can begin to look for further information here in the resources given below.

#### ArcGIS SDK for JS - AMD
Just like our CSS we need to pull our modules from the ArcGIS CDN through a link tag. This is a similar process, we define the link tag within the head tag of our index.html:

```bash
#index.html
<!--inside head tag-->
  <script type="text/javascript" src="https://js.arcgis.com/4.28/"></script>

<!--inside head tag-->
```

Note: Include the closing </script> tag is not always necessary but sometimes an error may occur if content is written all in one tag - this is just a HTML bug, not an issue with ArcGIS

This URL is fetching the version '4.28' for JS from the ArcGIS CDN.

#### Creating and referncing the script.js
Now we have the two link tags within our head section of the index.html, we need to create a javscript file to create our AMD modules fetch requests. These AMD modules are like GIS building blocks in this circumstance - we'll get to them later on.

Now let's create our script.js:
```bash
#terminal
touch script.js
```

And then connect our index.html and newly created script.js together:
```bash
#index.html
<!--inside head tag-->
  <script type="text/javascript" src="script.js"></script>

<!--inside head tag-->
```

We've got the basic infrastructure to begin selecting, designing and building our ArcGIS AMD application.

#### index.html <body> && containers
ArcGIS content is pulled at runtime from the CDN and is rednered through our index.html within div container. If oyu've seen examples of ArcGIS application you notice most of them take up about 100% of the window height and width - this isn't crucial to building our GIS application and we can create a small UI around our map if we want to. The Shetland Isles application has a small textbox at the bottom of the document where I wanted to add descriptive text. You can do something similiar or even place the map in different place of the documet.

For now I'm just going to create a div for my ArcGIS map and a text container for a small description.

In our body tag of the index.html we need two html components:

```bash
#index.html
<!--inside body tag-->
  <div id="viewDiv"></div>
  <p id="textBox">A small description of the map you are showcase</p>
<!--inside body tag-->
```

<b>What is "viewDiv"</b>
Convention on the ArcGIS documentation. It is typically the the div container we size for our ArcGIS Map content to be pulled through - a window for our map.

Now we've created these html elements <ul>we must create the CSS necessary to view our map</ul>.

In our <head>, index.html:
```bash
#index.html
<!--inside head tag-->
 <style>
            body {
                overflow: hidden;
            }
            /* prevent default browser scrolling behaviour */

            html,
            body,
            #viewDiv {
                padding: 0;
                margin: 0;
                height: 97.5%;
                width: 100%;
                background-color: black;
            } 
            /* selector targets three elements setting them to the styles specified */

            #textBox {
                position: relative;
                text-align: center; 
                color: whitesmoke; 
                background-color: black; 
                font-size: 16px;
                height: 2.5%;
                padding: 0.5%;
                margin: 0%;
                overflow-x: scroll;
            }
        </style>
<!--inside head tag-->

```

Lots of CSS, let's break it down.

- I've prevent elastic band like scrolling from the browser in the first CSS body tag selector
- I've create tag and an ID selectors for html, body and #viewDiv (our map container) - we've removed padding and margin so they will sit flush with our browser windows - we've defined the height to be 97.5% (room for our textbox) and the width to be 100% - finally setting the background to black
- The textbox has CSS styling to render white text centrally taking up the amount of space left in our document - there's some padding and overflow scrolling so that on smaller screens the user can scroll to the text if necessary

Note: we can set the maps height and width to anything we like however for this example the app focuses mainly on the ArcGIS map and its features - feel free to experiment though!

That's the index.html pretty much ready for our AMD module requests. Moving onto our script.js file:

#### script.js
Using require() and an arrow function to fetch and customise the AMD modules for our ArcGIS Map application. The structor of this require() function is as follows:

- first pass in an array of string URL for the modules we want to use for our build (before arrow)
- we then pass in the names of these modules as parameters (before arrow)
- we then create the constructors and customisable features for our map (after arrow)

Here's a basic example:

```bash
#Basic Require Example Skeleton
require([], () => {});

#Basic Require Example Populated
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView"
  ], (
  esriConfig,
  Map,
  MapView
  ) => {
  // Our Constructors + Any Customisable Javascript

  esriConfig.apiKey = "ARCGIS DEVELOPER KEY"; // Free when you create an ArcGIS Online account
  
  const map = new Map({
    basemap: "arcgis/topographic",
  });

  const mapview = new MapView({
     map: map,
    container: "viewDiv" // Here we're assigning our MapView to our div container
  });
```

<b>So what's going on here?</b>

We use require() to make the request to the ArcGIC CDN, passing in the parameters selected and the constructors we've created. ArcGIS uses a basemap (which can be customised online or within the app) that displays the world - this is our map constructor (new Map()). In order to view this map we need a view UI which we use to navigate round the basemap - this is our mapView (new MapView()). We pass the basemap into the mapview constructor so that it is being referenced in our view UI, we then declare that this view is going to be shown through the div container we chose (the "viewDiv").

ArcGIS Developer keys are free and necessary for accessing certain features of ArcGIS CDNs. By signing up you can then recieve a free key and access to data feature layers as well as premade maps and even customise your own.

#### That's it! 🗺️
And that's a basic ArcGIS SDK for Javascript Map Application using a AMD Modules build. The Shetland Isle application has a few examples of the other features that ArcGIS has to offer - by reading the documentation provided by Esri you can start to understand, create and implement your own features within a GIS application.

Further tips I'd recommend would be to check out the CodePen examples through the documentation and trying to recreate these with your own ideas and features. By positioning your own html widgets absolutely over your map (It's a little clunky but it works either way - be careful not to interfere with the ArcGIS UI) you can setup dynamic parameters (constructors, data, layers etc) that can be swapped in and out of your application. There are a lot of options.

### Resources
- https://developers.arcgis.com/javascript/latest/
- https://developers.arcgis.com/javascript/latest/api-reference/esri-views-View.html

# 🗾 ArcGIS SDK Javascript (AMD)
## ⛰️ Shetland Isles Topography App ⛰️

<img width="722" alt="Screenshot 2024-01-31 at 13 20 26" src="https://github.com/MDW-94/arcgis_map/assets/138756503/93f9e320-ddba-4e12-bb80-a5e3db7b1a62">

<img width="724" alt="Screenshot 2024-01-31 at 13 19 58" src="https://github.com/MDW-94/arcgis_map/assets/138756503/7668569d-aea3-4298-b028-041788f3b584">


- See URL for deployed application
- For ArcGIS ES Module Build tutorial & example go to https://github.com/MDW-94/arcgis_demo
  

### Setup & Installation

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

#### script.js
Now we have the two link tags within our head section of the index.html, we need to create a javscript file to create our AMD modules fetch requests. These AMD modules are like GIS building blocks in this circumstance - we'll get to them later on.



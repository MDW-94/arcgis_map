require([
  "esri/config",

  "esri/Map",
  "esri/views/MapView",

  "esri/WebMap",

  "esri/views/SceneView",
  "esri/WebScene",
  "esri/layers/ElevationLayer",

  "esri/widgets/Locate",
  "esri/widgets/Track",

  "esri/Graphic",

  "esri/layers/FeatureLayer",

  "esri/widgets/LayerList",
  "esri/layers/TileLayer",
  "esri/layers/ImageryLayer",
  "esri/layers/VectorTileLayer",
  "esri/widgets/Swipe",
  "esri/widgets/Legend",
  "esri/widgets/Expand",

  "esri/widgets/BasemapToggle",
  "esri/Basemap",

  // "esri/layers/ArcGISImageServiceLayer",

  "esri/geometry/Extent",
], (
  esriConfig,
  Map,
  MapView,

  WebMap,

  SceneView,
  WebScene,
  ElevationLayer,

  Locate,
  Track,

  Graphic,

  FeatureLayer,

  LayerList,
  TileLayer,
  ImageryLayer,
  VectorTileLayer,
  Swipe,
  Legend,
  Expand,

  BasemapToggle,
  Basemap

  // ArcGISImageServiceLayer
) => {
  esriConfig.apiKey =
    "AAPK5a4ef80094fe4b97adc491555c25fab7_B5IjF1tCDRw26KGoCLrauHItctUjCTgaL_4JQaCzu9ey2pcBEa4N1fgaiPhseVx";

  const switchButton = document.getElementById("switch-btn");

  const switchMapButton = document.getElementById("switch-map-btn");

  // const switchData = document.getElementById("switch-data-menu"); UNDER CONSTRUCTION

  // 2D Settings
  const map1 = new Map({
    basemap: "arcgis/topographic",
  });

  // const layer = new FeatureLayer({
  //   url: null,
  //   opacity: 0.5,
  // });

  const imageLayer = new ImageryLayer({
    portalItem: {
      id: "431f314cce9648b4a2da85a7359ccee4",
    },
    // renderingRule: null,
    // opacity: 0.5
    // original: 431f314cce9648b4a2da85a7359ccee4
    // Terrain: Slope Map
    // Source type: Elevation
    // Pixel type: Float
    // url: "https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer",
  });

  const imageLayer_2 = new ImageryLayer({
    portalItem: {
      id: "db38a951a2b643478a942ab22cd78fc6",
    },
    // opacity: 0.5
    // db38a951a2b643478a942ab22cd78fc6
    // e8f5557bfa4b4b5faa76e416c2721fb0
    // url: "https://elevation2.arcgis.com/arcgis/rest/services/Polar/AntarcticDEM/ImageServer",
  });

  const webmap = new WebMap({
    portalItem: {
      id: "21812b28afea4091bc57472297aa73d4",
    },
    // f317168ea86a44f9a0577dda2bf68b2d
  });

  // Setting the default app configurations for switching between 2D & 3D
  const appConfig = {
    mapView: null,
    sceneView: null,
    activeView: null,
    container: "viewDiv",
  };

  const initialViewParams = {
    center: [-1.25, 60.255],
    zoom: 8.5,
    constraints: {
      minScale: 8000,
      maxScale: 2500000,
      snapToZoom: false,
    },
    container: appConfig.container,
      // -1.25, 60.255 Shetland coords
  };

  // 3D Settings

  const scene = new WebScene({
    portalItem: {
      // autocasts as new PortalItem()
      id: "625455b01ad843ecbdd8ad8f5f71acfc", // ID of the WebScene on arcgis.com
    },
  });

  const elevLyr = new ElevationLayer({
    portalItem: {
      id: "7029fb60158543ad845c7e1527af11e4",
    },
  });

  // ---------------------------------

  // create 2D view and set to active
  appConfig.mapView = createView(initialViewParams, "2d");
  appConfig.mapView.map = map1; // Here is where the switch between 2D maps takes place switchMap()
  appConfig.activeView = appConfig.mapView;

  // create 3D view, won't initialize until selected
  initialViewParams.container = null;
  initialViewParams.map = scene;
  appConfig.sceneView = createView(initialViewParams, "3d");

  // Switches the view from 2D to 3D each time the button is clicked
  switchButton.addEventListener("click", () => {
    switchView();
  });

  // Switches the view from 2D to 3D and vice versa
  function switchView() {
    const is3D = appConfig.activeView.type === "3d";
    const activeViewpoint = appConfig.activeView.viewpoint.clone();

    // remove the reference to the container for the previous view
    appConfig.activeView.container = null;

    if (is3D) {
      // if the input view is a SceneView, set the viewpoint on the mapView instance. Set the container
      // on the mapView and flag it as the active view
      appConfig.mapView.viewpoint = activeViewpoint;
      appConfig.mapView.container = appConfig.container;
      appConfig.activeView = appConfig.mapView;
      switchButton.value = "3D";
    } else {
      appConfig.sceneView.viewpoint = activeViewpoint;
      appConfig.sceneView.container = appConfig.container;
      appConfig.activeView = appConfig.sceneView;
      switchButton.value = "2D";
    }
  }

  // ---------------- Under Construction

  // switchData.addEventListener("change", (evt) => {
  //   console.log(evt, "HII")
  //   switchDataLayer(evt);
  // });

  // function switchDataLayer(evt) {
  //   let result = imageLayer;
  //   if (evt.target.value === "Data1") {
  //     result = imageLayer;
  //     return result;
  //   }
  //   if (evt.target.value === "Data2") {
  //     result = imageLayer_2;
  //     return result;
  //   }
  //   console.log(result)
  // }

  // ----------------

  function createView(params, type) {
    let view;

    if (type === "2d") {
      // Render 2D Map

      view = new MapView(params);

      // if(appConfig.mapView.map === webmap){
      //   webmap.addMany([imageLayer]);
      // } else {
        // code below
      // }

      Promise.all([imageLayer.load()])
        .then(() => {
          map1.addMany([imageLayer]);
          const swipe = new Swipe({
            leadingLayers: [],
            trailingLayers: [imageLayer], // function to switch between layers
            position: 85,
            view: view,
          });

          const legend = new Legend({
            view: view,
          });

          const legendExpand = new Expand({
            expandIcon: "information",
            view: view,
            content: legend,
          });

          const basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "streets-relief-vector"
          })

          // watercolor: fdf540eef40344b79ead3c0c49be76a9

          view.ui.add([swipe]);

          view.ui.add(basemapToggle, 'bottom-left');

          view.ui.add(legendExpand, "bottom-right");

          // if(...){
          //   webmap.addMany([imageLayer]);
          // const swipe = new Swipe({
          //   leadingLayers: [],
          //   trailingLayers: [imageLayer], // function to switch between layers
          //   position: 85,
          //   view: view,
          // });
          // }
          
        })
        .catch((error) => console.error(error));

      // Promise to load layers + swipe widget with catchment incase of error
      return view;

    } else {
      // Render 3D Scene
      view = new SceneView(params);

      const legend = new Legend({
        view: view,
      });

      const legendExpand = new Expand({
        expandIcon: "information",
        view: view,
        content: legend,
      });

      view.ui.add(legendExpand, "bottom-right");
      // appConfig.mapView.map.ground.layers.add(elevLyr);
    }
    return view;
  }

  // ----------------------------

  // id="switch-map-btn"
  // value="WM"

  switchMapButton.addEventListener("click", () => {
    switchMap();
  });

  function switchMap() {
    const isWebMap = appConfig.mapView.map === webmap;

    if (isWebMap) {
      switchMapButton.value = "w/c";
      map1.removeAll();

      Promise.all([imageLayer.load()])  // Load any required layers
      .then(() => {
        appConfig.mapView.map = map1;
        map1.addMany([imageLayer]);
        // Additional code to configure layers, widgets, etc. for the web map
      })
      .catch((error) => console.error(error));

    } else {
      switchMapButton.value = "Map"
       // Remove web map layers
      webmap.removeAll();

      // Add 2D map layers
      Promise.all([imageLayer.load()])  // Load any required layers
        .then(() => {
          appConfig.mapView.map = webmap;
          webmap.addMany([imageLayer]);
          // Additional code to configure layers, widgets, etc. for the 2D map
        })
        .catch((error) => console.error(error));

      // Set the map of the 2D view to map1
      appConfig.mapView.map = map1;
    }
  }
});

// Animated raster data flow

// https://www.esri.com/arcgis-blog/products/js-api-arcgis/mapping/create-an-animated-flow-visualization-with-the-arcgis-api-for-javascript/

// 

//  https://spatialreserves.wordpress.com/
// https://spatialreserves.wordpress.com/2019/02/18/the-top-10-most-useful-geospatial-data-portals-revisited/

// https://github.com/orgs/community/discussions/57070

// https://sentry.io/answers/undo-the-most-recent-local-git-commits/#:~:text=The%20Solution,commits%20without%20losing%20any%20work.

// Things to do:
// 1 - Try and convert into Typescript
// 2 - Find multiple datasets that can help you make your map more interesting
// 3 -

// https://developers.arcgis.com/javascript/latest/tutorials/add-a-point-line-and-polygon/

// https://portal.opentopography.org/dataspace/dataset?opentopoID=OTDS.112021.4326.3

// https://portal.opentopography.org/datasetMetadata?otCollectionID=OT.112018.3413.1

// https://codepen.io/pen?editors=1010
// https://developers.arcgis.com/javascript/latest/sample-code/widgets-swipe/

// https://www.arcgis.com/home/item.html?id=e8d799074d4d4b04b4f54577bd057758

//https://developers.arcgis.com/javascript/latest/proxies/

// https://doc.arcgis.com/en/arcgis-online/manage-data/publish-tiles.htm
// publish a tile service of the raster data in order to be able to bring it into the map as a feature layer using an id reference?

//https://portal.opentopography.org/arcticDem?opentopoID=OTSDEM.112018.3413.3

// https://maps.gov.scot/server/rest/services/ScotGov/HealthSocialCare/MapServer/0

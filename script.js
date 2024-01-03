require([
    "esri/config",

    "esri/Map", 
    "esri/views/MapView",

    "esri/views/SceneView",
    "esri/WebScene",

    "esri/widgets/Locate",
    "esri/widgets/Track",

    "esri/Graphic",

    "esri/layers/FeatureLayer",

    "esri/widgets/LayerList",
    "esri/layers/TileLayer",
    "esri/layers/ImageryLayer",
    "esri/widgets/Swipe",

    // "esri/layers/ArcGISImageServiceLayer",

    "esri/geometry/Extent"

    ], (esriConfig, 
        Map, 
        MapView,

        SceneView,
        WebScene,

        Locate,
        Track,

        Graphic,
        
        FeatureLayer,

        LayerList,
        TileLayer,
        ImageryLayer,
        Swipe,

        // ArcGISImageServiceLayer
        
        ) => {

        esriConfig.apiKey = "AAPK5a4ef80094fe4b97adc491555c25fab7_B5IjF1tCDRw26KGoCLrauHItctUjCTgaL_4JQaCzu9ey2pcBEa4N1fgaiPhseVx";

        // esriConfig.request.proxyUrl = "https://elevation2.arcgis.com/arcgis/rest/services/Polar/ArcticDEM/ImageServer"

        const switchButton = document.getElementById("switch-btn");

        const map1 = new Map({
            basemap: "arcgis/topographic"
        });

        // const view_ui = new MapView({
        //     container: "viewDiv",
        //     map: map1,
        // });


           // 2D Settings
      
        const layer = new FeatureLayer({
            url: "https://maps.gov.scot/server/rest/services/ScotGov/HealthSocialCare/MapServer/0",
            opacity: 0.5
        });

            Promise.all([layer.load()])
            .then(() => {
                map1.addMany([layer])
            })
            .catch(error => console.error('error loading layer'));


        // view_ui.ui.add(swipe)

        // Promise to load layer with catchment incase of error

     
        const appConfig = {
            mapView: null,
            sceneView: null,
            activeView: null,
            container: "viewDiv"
        }

        const initialViewParams = {
            center: [-1.25, 60.255],
            zoom: 9,
            constraints: {
                minScale: 9000,
                maxScale: 1600000,
                snapToZoom: false
            },
            container: appConfig.container
        }


        // 3D Settings

        const scene = new WebScene({
            portalItem: { // autocasts as new PortalItem()
              id: "625455b01ad843ecbdd8ad8f5f71acfc"  // ID of the WebScene on arcgis.com
            }
          });



        // create 2D view and set to active
        appConfig.mapView = createView(initialViewParams, "2d")
        appConfig.mapView.map = map1
        appConfig.activeView = appConfig.mapView

        // create 3D view, won't initialize until selected
        initialViewParams.container = null;
        initialViewParams.map = scene;
        appConfig.sceneView = createView(initialViewParams, '3d');

        // Switches the view from 2D to 3D each time the button is clicked
        switchButton.addEventListener("click", () => {
            switchView();
        })

        // Switches the view from 2D to 3D and vice versa
        function switchView() {
            const is3D = appConfig.activeView.type === '3d';
            const activeViewpoint = appConfig.activeView.viewpoint.clone();

        // remove the reference to the container for the previous view
        appConfig.activeView.container = null;

        if(is3D){
            // if the input view is a SceneView, set the viewpoint on the mapView instance. Set the container
            // on the mapView and flag it as the active view
            appConfig.mapView.viewpoint = activeViewpoint;
            appConfig.mapView.container = appConfig.container;
            appConfig.activeView = appConfig.mapView;
            switchButton.value = '3D';
        } else {
            appConfig.sceneView.viewpoint = activeViewpoint;
            appConfig.sceneView.container = appConfig.container;
            appConfig.activeView = appConfig.sceneView;
            switchButton.value = '2D';
        }
        }

        function createView(params, type){
            let view;
            if(type === '2d'){
                view = new MapView(params);

                const swipe = new Swipe({
                    leadingLayers: [],
                    trailingLayers: [],
                    position: 85,
                    view: view
                })

                view.ui.add(swipe);

                return view;
                
            } else {
                view = new SceneView(params);
            }
            return view;
        }


      
        // -1.25, 60.255 original coords


        // const tileLayer1 = new TileLayer({
        //     url: "",
        // })
        // map.add(tileLayer1)

        // const imageryLayer = new ImageryLayer({
        //     // itemId: "6fedfbe38d9d4fc0a2b24b715d40017c"
        //     url: "https://elevation2.arcgis.com/arcgis/rest/services/Polar/AntarcticDEM/ImageServer"
        // })
        // map.add(imageryLayer)

        // const imageLayer = new ArcGISImageServiceLayer("https://elevation2.arcgis.com/arcgis/rest/services/Polar/ArcticDEM/ImageServer");
        // map.addLayer(layer);


        // const locate = new Locate({
        //     view: view,
        //     goToOverride: function(view, options){
        //         options.target.scale = 0; // add option to zoom in or not? Pop-up feature
        //         return view.goTo(options.target)
        //     }
        // });

        // view.ui.add(locate, 'top-left');

        // const track = new Track({
        //     view: view,
        //     graphic: new Graphic({
        //         symbol: {
        //             type: "simple-marker",
        //             size: "12px",
        //             color: "green",
        //             outline: {
        //                 color: "#efefef",
        //                 width: "1.5px"
        //             }
        //         }
        //     }),
        // });

        // view.ui.add(track, 'top-left');

    
    });

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





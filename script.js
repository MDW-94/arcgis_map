require([
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/widgets/Locate",

    "esri/widgets/Track",
    "esri/Graphic",

    "esri/layers/FeatureLayer"

    ], (esriConfig, 
        Map, 
        MapView,
        Locate,
        
        Track,
        Graphic,
        
        FeatureLayer) => {

        esriConfig.apiKey = "AAPK5a4ef80094fe4b97adc491555c25fab7_B5IjF1tCDRw26KGoCLrauHItctUjCTgaL_4JQaCzu9ey2pcBEa4N1fgaiPhseVx";

        const map = new Map({
            basemap: "arcgis/topographic"
        });

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-3.5, 56.255],
            zoom: 8.75
        });

        const layer = new FeatureLayer({
            url: "https://maps.gov.scot/server/rest/services/ScotGov/HealthSocialCare/MapServer/0",
            opacity: 0.5
        });

        const layerPromise = new Promise(function(myResolve, myReject){
            layer.load();

            myResolve();
            myReject();
        })

        layerPromise.then(map.addMany([layer]))

        
        

        

        const locate = new Locate({
            view: view,
            goToOverride: function(view, options){
                options.target.scale = 0; // add option to zoom in or not? Pop-up feature
                return view.goTo(options.target)
            }
        });

        view.ui.add(locate, 'top-left');

        const track = new Track({
            view: view,
            graphic: new Graphic({
                symbol: {
                    type: "simple-marker",
                    size: "12px",
                    color: "green",
                    outline: {
                        color: "#efefef",
                        width: "1.5px"
                    }
                }
            }),
        });

        view.ui.add(track, 'top-left');

        


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





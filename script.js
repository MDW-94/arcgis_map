require([
    "esri/config",
    "esri/Map", 
    "esri/views/MapView",
    "esri/widgets/Locate",

    "esri/widgets/Track",
    "esri/Graphic"

    ], (esriConfig, 
        Map, 
        MapView,
        Locate,
        
        Track,
        Graphic) => {

        esriConfig.apiKey = "AAPK5a4ef80094fe4b97adc491555c25fab7_B5IjF1tCDRw26KGoCLrauHItctUjCTgaL_4JQaCzu9ey2pcBEa4N1fgaiPhseVx"

        const map = new Map({
            basemap: "topo-vector"
        });

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-3.5, 56.255],
            zoom: 8.75
        });

        const locate = new Locate({
            view: view,
            useHeadingEnabled: false,
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
            useHeadingEnabled: false
        });

        view.ui.add(track, 'top-left');


    });
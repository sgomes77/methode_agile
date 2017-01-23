
// De la documentation ici : https://github.com/IGNF/geoportal-extensions/blob/master/README-leaflet.md 

function go() {
    map = L.map("map").setView([46.1756788, 6.538962099999935], 7);
    
    var lyrOrtho = L.geoportalLayer.WMTS(
        {
            layer: "ORTHOIMAGERY.ORTHOPHOTOS",
        }
    );
    map.addLayer(lyrOrtho);

}

Gp.Services.getConfig({
    apiKey : "aaweyz4astflmmyost6f0qv9",
    onSuccess : go
});

var infoDiv= document.getElementById("info") ;
infoDiv.innerHTML= "<p> Extension Leaflet version "+Gp.leafletExtVersion+" ("+Gp.leafletExtDate+")</p>" ;

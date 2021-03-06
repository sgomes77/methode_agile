
// De la documentation ici : https://github.com/IGNF/geoportal-extensions/blob/master/README-leaflet.md 
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'stations_ski.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }


function go() {
    map = L.map("map").setView([46.1756788, 6.538962099999935], 14);
    
  	map.setMinZoom(6);

    var lyrOrtho = L.geoportalLayer.WMTS(
        {
            layer: "ORTHOIMAGERY.ORTHOPHOTOS",
        }
    );
    map.addLayer(lyrOrtho);
    var lyr = L.geoportalLayer.WMTS(
        {
            layer: "ELEVATION.SLOPES",
        }
    );

    lyr.addTo(map); // ou map.addLayer(lyr);

// Création et ajout du LayerSwitcher
    map.addControl(
        L.geoportalControl.LayerSwitcher()
    );

loadJSON(function(response) {
   	var actual_JSON= JSON.parse(response);
	var list = actual_JSON.features;
	for(var i=0;i<list.length;i++)
	{	
		var lat;
	    var lon;
		var cat = list[i].properties["CATEGORIE"];
		if(cat =="R")
		{
			var station_ski = L.icon({
	   		 iconUrl: 'icon_ski_red.png',
		        iconSize:     [38, 38], // size of the icon
	    		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	   		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
		}

		if(cat =="V")
		{
			var station_ski = L.icon({
	   		 iconUrl: 'icon_ski_green.png',
		        iconSize:     [38, 38], // size of the icon
	    		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	   		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
         }
		
		if(cat =="B")
		{
			var station_ski = L.icon({
	   		 iconUrl: 'icon_ski_blue.png',
		        iconSize:     [38, 38], // size of the icon
	    		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	   		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
         }

		if(cat =="N")
		{
			var station_ski = L.icon({
	   		 iconUrl: 'icon_ski_black.png',
		        iconSize:     [38, 38], // size of the icon
	    		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	   		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
        }

                var coordinates = list[i].geometry.coordinates;
                if(Array.isArray(coordinates[0][1]))
		{
		    lat= coordinates[0][0][1];
		    lon= coordinates[0][0][0];	
		}
		
		else
		{
		  lat = coordinates[0][1];
		  lon = coordinates[0][0];
		}
		
		var nom = list[i].properties["NOM_PISTE"];
		if(nom=="") { nom= "inconnu";}
	        L.marker([lat, lon],{icon: station_ski}).addTo(map).bindPopup("Nom:"+nom+"<br/>"+"Alt : "+list[i].properties["ALT_HAUT"]+" m </br>"+"Déniv : "+list[i].properties["DENIVELEE"]+"m");
	}
 });
}

Gp.Services.getConfig({
    apiKey : "aaweyz4astflmmyost6f0qv9",
    onSuccess : go
}) ;

var infoDiv= document.getElementById("info") ;
infoDiv.innerHTML= "<p> Extension Leaflet version "+Gp.leafletExtVersion+" ("+Gp.leafletExtDate+")</p>" ;

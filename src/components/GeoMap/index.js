import React from "react";
import L from "leaflet";
import 'leaflet.markercluster';


export default (props) => {
  React.useEffect(() => {
    const MAP_CONTAINER2 = document.getElementById("map-container2");

    if (props.results) {
      const MAP_ID2 = document.createElement("div");
      MAP_ID2.setAttribute("id", "mapid2");
      MAP_CONTAINER2.appendChild(MAP_ID2);

      let siteMap; 
      siteMap = L.map("mapid2").setView([47.6062, -122.3321], 10) 

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAP_API_KEY,
        }
      ).addTo(siteMap);

        // Create a new marker cluster group
        var markers2 = L.markerClusterGroup();

      props.results.siteData.forEach((pin) =>
      (pin.latitude || pin.longitude) ? 
      markers2.addLayer(L.marker([pin.latitude, pin.longitude]).bindTooltip('Hi') 
   ) : null );

     // Add our marker cluster layer to the map
      siteMap.addLayer(markers2);

  
            

                var geoJson = L.geoJson(props.results.geoData, {
                style: function(feature) {
                    return {
                    color: "#a0ced9",
                    fillColor: "#f5cb5c",
                    fillOpacity: 0.8,
                    weight: 1.5
                    };
                },
                onEachFeature: function(feature, layer) {
                    layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                        fillOpacity: 1
                        });
                    },
                    mouseout: function(event) {
                        geoJson.resetStyle(event.target);
                    },
                    click: function(event) {
                        siteMap.fitBounds(event.target.getBounds());
                    }
                    });
                    layer.bindTooltip("<p><b>" + feature.properties.neighborhood + "</b></p>");
                }
                }).addTo(siteMap);
    }

    return () => (MAP_CONTAINER2.innerHTML = "");
  }, [props.results]);

  return <div id="map-container2"></div>;
};
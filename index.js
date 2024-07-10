
function updateCountry()
{
    fetch("data.json")
        .then((response) => response.json())
        .then(resp => {
          resp.data.forEach(element => {
            latitude = element.latitude;
            longitude = element.longitude; 

            infections = element.infected;
            if(infections>255){
                color = "red";
            }
            else{
                color = `rgb(${infections},0,0)`
            }

            //Mark the Map
            const marker = new maptilersdk.Marker({
                color: color,
                draggable: true
              })
                .setLngLat([longitude, latitude])
                .addTo(map);
            var popup = new maptilersdk.Popup({ offset: 25 }).setText(
                `Total deaths: ${infections}`
            );

            var el = document.createElement('div');
            el.id = 'marker';
            
            // create the marker
            new maptilersdk.Marker({element: el})
                .setLngLat([longitude, latitude])
                .setPopup(popup) // sets a popup on this marker
                .addTo(map)
        });
    });
}

updateCountry();
let interval = 20000;
setInterval(updateCountry, interval); 


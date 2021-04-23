window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temperature-description");
    let tempDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let tempIcon = document.querySelector(".temp-icon");

    //If the user ALLOWS the geolocation to load
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userLocation => {
            long = userLocation.coords.longitude;
            lat = userLocation.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2865d517f56106720786fe2ecf53fe85`;

            //This fetch call is to get data 
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { name } = data; //Object destructuring Meaning to extract the value for name from the data- which is everything
                    const { feels_like } = data.main;
                    const { id, main, description } = data.weather[0];
                    //This one means to get the values for id and main from the data.whether[0]

                    locationTimezone.textContent = name;
                    console.log(data);
                    tempDegree.textContent = Math.round(feels_like - 273.15);
                    tempDescription.textContent = description;

                    if(id < 250){
                        tempIcon.src = './icons/icons8-cloud-lightning-100.png'
                    }
                    else if(id <  350){
                        tempIcon.src = './icons/icons8-snow-100.png'
                    }
                    else if(id <  350){
                        tempIcon.src = './icons/icons8-rainbow-100.png'
                    }
                    else if(id <  550){
                        tempIcon.src = './icons/icons8-rain-100.png'
                    }
                    else if(id <  650){
                        tempIcon.src = './icons/icons8-snow-100.png'
                    }
                    else if(id <  790){
                        tempIcon.src = './icons/icons8-wind-100.png'
                    } 
                    else if(id <  810){
                        tempIcon.src = './icons/icons8-partly-cloudy-day-100.png'
                    }
                });
        });

    }
    //If the user doesn't allow geolocation, display
    else {
        alert("Kindly allow location so you can get the weather forecast")
    };

});
const locationInput = document.getElementById('location');
const search = document.getElementById('search');
const weather = document.getElementById('weather');
//create a new div element that assigns it to forecast
const forecast = document.createElement('div');
forecast.id ='forecast';
//append it to the element with the weather id
weather.appendChild(forecast);
 let key='63463a97ab5786d2724ab60325a44239';
 let url = 'https://api.openweathermap.org/data/2.5/weather'
//what will happen when the search button is pressed
search.addEventListener('click',function(){
    fetch(`{url}?q=${locationInput}&appid=${key}`)
    .then(response => response.json())
    .then(data => {
        weather = data.list[0].weather[0].description;//extracts the description of the  weather from the fetched data
        Temp = Math.round(data.list[0].main.temp - 273.15);//converts the temperature to celcius by subtracting and rounding to the nearest whole number
        //updates the html content with the id weather
        weather.innerHTML = `
            <p>Current weather: ${weather}</p>
            <p>Current temperature: ${Temp}°C</p>
        `;
        forecast.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            //converts the timestamp received to a datestring
            const date = new Date(data.list[i].dt * 1000).toDateString();
            const temp = Math.round(data.list[i].main.temp - 273.15);
            const condition = data.list[i].weather[0].description;
            forecast.innerHTML += `
                <p>${date}: ${temp}°C, ${condition}</p>
            `;
        }
    })
    .catch(error => {
        weather.innerHTML = `<p>Error: ${error}</p>`;
    });
});
  

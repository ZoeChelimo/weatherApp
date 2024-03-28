const forecast = document.createElement('div');
forecast.id = 'forecast';
weather.appendChild(forecast);
API_KEY='4f3a878109435e7cd6b955ec256fc420'

search.addEventListener('click', function () {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.list[0].weather[0].description;
            const currentTemp = Math.round(data.list[0].main.temp - 273.15);
            weather.innerHTML = `
                <p>Current weather: ${currentWeather}</p>
                <p>Current temperature: ${currentTemp}°C</p>
            `;
            forecast.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
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

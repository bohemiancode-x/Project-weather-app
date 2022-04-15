const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//update ui function
const updateUI = (data) => {
    const cityData = data.cityData;
    const weather = data.weather;

    //update details template
    details.innerHTML = `
        <h5>${cityData.EnglishName}</h5>
        <div>${weather.WeatherText}</div>
        <div class=" degrees display-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

     // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);


    //remove display none
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
      }
}


const updateCity = async (city) => {
    const cityData = await getCity(city);
    const weather = await getWeather(cityData.Key);

    return { cityData, weather };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //store city in local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
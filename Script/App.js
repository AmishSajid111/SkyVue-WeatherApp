const cityForm = document.querySelector("form");
const details = document.querySelector(".details");
const card = document.querySelector(".card");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const body = document.querySelector("body");

const label = document.querySelector("label");
const updateUI = (data) => {

  const { cityDet, weather } = data;
  details.innerHTML = ` 
    <h5 class="my-3">${cityDet.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div> `;
  // updating icon and img
  const iconSrc = `icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);


  let timeSrc = null;
  if(weather.IsDayTime){
    timeSrc='img/day.svg'
    body.setAttribute('style', "background-image:url(rohit-tandon-9wg5jCEPBsw-unsplash.jpg);color:black");
    label.setAttribute('style',"color:black")
}
else{
    timeSrc='img/night.svg'
    body.setAttribute('style', "background-image:url(benjamin-voros-phIFdC6lA4E-unsplash.jpg);color:White");
  
    label.setAttribute('style',"color:white")

}
  time.setAttribute("src", timeSrc);
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
// updating the UI with the city
const updateCity = async (city) => {
  const cityDet = await getCity(city);
  const weather = await getWeather(cityDet.Key);

  return { cityDet, weather };
};
cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
   localStorage.setItem('city',city);
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
if(localStorage.getItem('city'))
{
    updateCity(localStorage.getItem('city'))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}


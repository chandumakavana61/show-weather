

let fetchData = async (cityName) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cfe72aaf8e8c2558d774e9b7991f89de`)
  const data = await response.json()

  return data

}



const day = document.querySelector('#day')
const date = document.querySelector('#date')
const city = document.querySelector('#cityName')
const realFeel=document.querySelector('#realFeel')
const humidity = document.querySelector('#humidity')
const currentDegree = document.querySelector('#currentDegree')
const wind =  document.querySelector('#wind')
const loader = document.querySelector('#loader')
let lastCity=localStorage

day.innerHTML = new Date().toLocaleDateString('en-US', { weekday: 'long' })
date.innerHTML = new Date().toLocaleDateString('en-Us', { day: 'numeric', month: 'short' })


const form = document.querySelector('form')


form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const cityName = form.searchCity
  if (cityName.value === '') {
    cityName.value = "surat"
  }

  try {
    let data = await fetchData(cityName.value)
    if(data.cod==200){
      lastCity.setItem('savedCity',cityName.value)
      cityName.value='  '
      city.style.color='white'
      city.innerHTML=data.name
      currentDegree.innerHTML=Math.round(data.main.temp-273.15)
      realFeel.innerHTML=Math.round(data.main.feels_like-273.15)
      humidity.innerHTML=data.main.humidity
      wind.innerHTML=data.wind.speed
      
    } 
    else if(data.cod==404){
      city.style.color='#5c0000'
      
     
      city.innerHTML = "Please enter correct city name"
      
    }
     
  } catch (error) {
    // Debug: Log the actual error for better debugging
    console.error('Error fetching weather data:', error);
    city.innerHTML = "Please enter correct city name"
  }

})


window.addEventListener('load', async () => {

    loader.classList.add('hidden')

  try {
    let data = await fetchData(lastCity.getItem('savedCity' || 'surat'))
    city.innerHTML=data.name
    currentDegree.innerHTML=Math.round(data.main.temp-273.15)
    realFeel.innerHTML=Math.round(data.main.feels_like-273.15)
    humidity.innerHTML=data.main.humidity
    wind.innerHTML=data.wind.speed

  } catch (error) {
    console.error('Error fetching weather data:', error);
    city.innerHTML = "Please enter correct city name"
  }
})


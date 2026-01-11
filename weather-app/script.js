// http://api.weatherapi.com/v1/current.json?key=f2c2286185c44da9b33115026260901&q=Bishkek&aqi=no


const temperatureField = document.querySelector(".temperature");
const locationField = document.querySelector(".time-location p");
const dateandTimeField = document.getElementById(".time-location span");
const conditionField = document.querySelector(".condition p");
const form = document.querySelector(".form");
const searchField = document.querySelector(".search-area")


form.addEventListener('submit', searchForLocation)

let target = 'Karakol'


const fetchResults = async (targetLocation)=>{
    let url = `http://api.weatherapi.com/v1/current.json?key=f2c2286185c44da9b33115026260901&q=${targetLocation}&aqi=no`

    // fetch(url) — это функция и она не возвращает сразу данные, а возвращает Promise — это как обещание:
    // «Я принесу данные позже, когда сервер ответит» 
    let res = await fetch(url)
    let data = await res.json()

    console.log(data)

    let locationName = data.location.name
    let time = data.location.localtime
    let temp = data.current.temp_c
    let condition = data.current.condition.text

    updateDetails(locationName, time, temp, condition)
}


function searchForLocation(e){
    e.preventDefault()

    target = searchField.value 

    fetchResults(target) 
}
fetchResults(target)




function updateDetails(locationName, time, temp, condition){
    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]
    let currentDay = getDayName(new Date(splitDate).getDay())      
    // new Date() — это конструктор встроенного объекта Date

    locationField.innerHTML = locationName
    dateandTimeField.innerHTML = `${splitDate} ${splitTime} ${currentDay}`
    temperatureField.innerHTML = temp
    conditionField.innerHTML = condition
}


function getDayName(dayNumber){
    switch(dayNumber){
        case 0: return 'Sunday'
        case 1: return 'Monday'
        case 2: return 'Tuesday'
        case 3: return 'Wednesday'
        case 4: return 'Thursday'
        case 5: return 'Friday'
        case 6: return 'Saturday'
    }
}

// http://api.weatherapi.com/v1/current.json?key=f2c2286185c44da9b33115026260901&q=Bishkek&aqi=no

const temperatureField = document.querySelector(".temperature")
const locationField = document.querySelector(".time-location p")
const dateandTimeField = document.querySelector(".time-location span")
const conditionField = document.querySelector(".condition")
const form = document.querySelector(".form")
const searchField = document.querySelector(".search-area")


form.addEventListener('submit', searchForLocation)

let target = 'Karakol'


const fetchResults = async (target)=>{
    let url = `http://api.weatherapi.com/v1/current.json?key=f2c2286185c44da9b33115026260901&q=${target}&aqi=no`

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
    let parts = splitDate.split('-')
    let year = parts[0]
    let day = parts[1]
    // let splitTime = time.split(' ')[1]
    let currentDay = getDayName(new Date(splitDate).getDay())
    let currentMonth = getMonthName(new Date(splitDate).getMonth())

    temperatureField.innerHTML = temp
    locationField.innerHTML = locationName
    dateandTimeField.innerHTML = `${year} ${day} ${currentMonth} ${currentDay} `
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
        default: return 'Unknown'
    }
}

function getMonthName(monthNumber){
    switch(monthNumber){
        case 0: return 'January'
        case 1: return 'February'
        case 2: return 'March'
        case 3: return 'April'
        case 4: return 'May'
        case 5: return 'June'
        case 6: return 'July'
        case 7: return 'August'
        case 8: return 'September'
        case 9: return 'Oktober'
        case 10: return  'November'
        case 11: return  'December'
        default: return 'Unknown'
    }
}
const requestObject = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3b7415200amsh34b325e5077b472p12768djsnbff6fbf09ea3',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
//Creating a request object

let searchBar = document.querySelector('#searchBar')
searchBar.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searched();
    }
});
//function to execute searched() when enter is pressed while cursuor is on the search bar

async function requestData(cityName) {
    const response = await fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName, requestObject);
    if (response.status != 200) {
        throw new Error('Error with fetching data')
    }
    return response.json();
}
//Asynchronous function using async and await to request data from api


function searched() {
    searchBar = document.querySelector('#searchBar')
    let cityName = searchBar.value

    //document.querySelector(".errorMessage").style.display = "none"

    requestData(cityName)
        .then(data => {
            console.log("data received")
            resetPage(data, cityName);
        })
        .catch(err => {
            console.log(err.message);
            errorWithData();
        })
}
//function that executes the formatter after correct data has been received

function resetPage(data, cityName){
    document.querySelector('#landingDiv').style.display = "none";
    let result = document.querySelector('#resultDiv');
    result.style.display="flex";

    result.firstElementChild.innerText = cityName
    result.firstElementChild.nextElementSibling.firstElementChild.innerText= "Temperature: "+ data.temp
    result.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText = "Feels Like "+data.feels_like;
    result.firstElementChild.nextElementSibling.lastElementChild.innerText = "Humidity: "+ data.humidity
}
//function to format and display results

function backToLanding(){
    document.querySelector('#resultDiv').style.display="none";
    document.querySelector('#landingDiv').style.display = "flex";
    document.querySelector('#searchBar').value = null;
    if(document.querySelector('.errormessage').style.display != "none"){
        document.querySelector('.errormessage').style.display = "none"
    }
}
//function to reset the page to landing

function errorWithData(){
    if(! (document.querySelector('.errorMessage'))){
        let errorMessage = document.createElement("p")
    errorMessage.className = "errorMessage"
    errorMessage.innerText = "Error getting data, try again"
    errorMessage.style.display = "block"
    document.querySelector('#searchBar').parentNode.insertBefore(errorMessage, document.querySelector('#buttonOne'));
    }
}
//function to create an error message on screen only if it hasnot been previously created
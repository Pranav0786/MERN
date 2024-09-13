const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const cityNotFound = document.querySelector(".cityNotFound") ;

// initial variable needs
let currentTab = userTab;
const API_KEY = "5c520aefcf0edeeee90bec7f77ef807d";
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab) {
    if( clickedTab !== currentTab ) 
    {
        if( currentTab )
            currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        if(currentTab) 
            currentTab.classList.add("current-tab");

        if( !searchForm.classList.contains("active") ) 
        {
            // search is invisible make it visible
            if (userInfoContainer) 
                userInfoContainer.classList.remove("active");
            if (grantAccessContainer)
                grantAccessContainer.classList.remove("active");
            if (searchForm) 
                searchForm.classList.add("active");
        } 
        else 
        {
            // previously on search tab, make user tab visible
            if (searchForm) 
                searchForm.classList.remove("active");
            if (userInfoContainer)
                userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}


userTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(searchTab);
});

function getfromSessionStorage() {
    // check if coordinates are already stored
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) 
    {
        // if no local coordinates found
        if (grantAccessContainer) 
            grantAccessContainer.classList.add("active"); 
        else 
            console.error("grantAccessContainer is null");
    } 
    else 
    {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // make grant invisible
    if(grantAccessContainer)
        grantAccessContainer.classList.remove("active");
    // make loader visible
    if(loadingScreen)
        loadingScreen.classList.add("active");
    // API call
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if(loadingScreen)
            loadingScreen.classList.remove("active");
        if(userInfoContainer)
            userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } 
    catch (err) {
        if (loadingScreen) {
            loadingScreen.classList.remove("active");
        }
        console.error("Error Occurred", err);
    }
}

function renderWeatherInfo(weatherInfo) {
    // fetch the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudinees]");

    // fetch value from weatherInfo object and put in UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C` ;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s` ;
    humidity.innerText = `${weatherInfo?.main?.humidity}%` ;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%` ;
}

function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
    else 
        alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

let searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "") return;
    fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(cityName) {
    if(loadingScreen) 
        loadingScreen.classList.add("active");
    if(userInfoContainer)
        userInfoContainer.classList.remove("active");
    if(grantAccessContainer)
        grantAccessContainer.classList.remove("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            showErrorSearch() ;
            return ;
        }
        const data = await response.json();
        if( loadingScreen ) 
            loadingScreen.classList.remove("active");
        if( userInfoContainer ) 
            userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } 
    catch (e) {
        console.log("Hee") ;
    }
}

function showErrorSearch() {
    console.log("City Not Found") ;
    if( loadingScreen ) 
        loadingScreen.classList.remove("active");
    if( userInfoContainer ) 
        userInfoContainer.classList.remove("active");
    cityNotFound.classList.add("active") ;
}

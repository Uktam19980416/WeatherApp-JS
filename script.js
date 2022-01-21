window.addEventListener('DOMContentLoaded', () => {
    const api = {
        key: '174bd88399a8c4905a356f4fb6e108f1',
        baseURL: 'https://api.openweathermap.org/data/2.5/'
    }
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keypress', setQuery)

    function setQuery(event) {
        if (event.keyCode == 13) {
            getResults(searchBox.value);
        }
    }

    function getResults(query) {
        fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(displayResults)
    }

    function displayResults(weather) {
        console.log(weather);
        let city = document.querySelector('.location .city')
        city.innerHTML = `${weather.name}, ${weather.sys.country}`;
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerHTML = dateBuilder(now);

        let temp = document.querySelector('.temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

        let weatherEl = document.querySelector('.weather');
        weatherEl.innerHTML = weather.weather[0].main;
        let high_low = document.querySelector('.high-low');
        high_low.innerHTML = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`
    }

    function dateBuilder(s){
        let months = ['January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'];
        let days = ['Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ];
        let day = days[s.getDay()];
        // let date = s.getDate();
        let month = months[s.getMonth()];
        let year = s.getFullYear();

        return `${day}, ${month} ${year}`;
    }
} )
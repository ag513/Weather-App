const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')

weatherFrom.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    message1.textContent = 'loading...'
    message2.textContent = ''
    weatherIcon.style.display = 'none'

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
                weatherIcon.setAttribute('src', data.forecastIcon)
                weatherIcon.style.display = 'block'
            }
        })
    });
})

let options = '';

search.addEventListener('input', () => {
    const searchKey = search.value
    console.log(searchKey.length)
    if (searchKey.length >= 3) {
        fetch('/locations?locationName=' + searchKey).then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    return
                }
                data.forEach((location) => {
                    options += '<option value="' + location + '" />';

                });
                document.getElementById('locationsList').innerHTML = options;
            })
        })
    }
})
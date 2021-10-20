console.log('from scripts');

fetch('http://localhost:3001/weather?address=!').then((res) => {
    res.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
});
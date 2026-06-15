const req = fetch('https://supersimplebackend.dev/greeting').then((response) => {
    console.log(response);
    console.log(response.text());
})

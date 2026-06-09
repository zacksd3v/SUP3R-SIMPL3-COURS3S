async function greeting() {
    try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        console.log(data);

        if (response.status >= 400) {
            throw new Error(`Bad Request Bro! ${response.status}`);
        }
    } catch(error) {
        if (error.status === 400) {
            console.log( await error.json() );
        } else {
            console.log('Network error, Please try again later!');
        }
    }
}

greeting();
async function greeting() {
    const userInfo = {
        name: 'Ramadan Mubarak'
    };

    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInfo.name
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

greeting();

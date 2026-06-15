const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    try {
        const response = JSON.parse(xhr.responseText);
        // console.log(response);
        // console.log(`Title: ${response.title}`);
        // console.log(`Body: ${response.body}`);

    } catch (error) {
        console.log('Unpected Error Occur', error);
    }
});

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
xhr.send();
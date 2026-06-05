const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
    console.log(`Title: ${response.title}`);
    console.log(`Body: ${response.body}`);
});

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
xhr.send();
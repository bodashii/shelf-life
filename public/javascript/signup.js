// async function loginFormHandler(event) {
//     event.preventDefault();

//     const email = document.querySelector('#email').value.trim();
//     const password = document.querySelector('#password').value.trim();

//     if (email && password) {
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email,
//                 password
//             }),
//             headers: { 'Content-Type': 'application/json' }
//         })
//         // console.log(response);
//         // check the response status
//         if (response.ok) {
//             document.location.replace('/');
//         } else {
//             alert(response.statusText);
//         }
//     }
// }



async function signUpHandler() {
    
    // change these id's to whatever id we have, instead of my dumbie data
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status
        if (response.ok) {
            // send them to the right page after signing up
            document.location.replace('/posts');
        } else {
            alert(response.statusText);
        }
    }
}


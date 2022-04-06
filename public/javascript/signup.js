async function loginHandler() {

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // console.log(response);
        // check the response status
        if (response.ok) {
            document.location.replace('/');
            console.log("logged in");
            
        } else {
            alert(response.statusText);
        }
    }
}



async function signUpHandler() {
    
    // change these id's to whatever id we have, instead of my dumbie data
    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const age = document.querySelector('#age').value.trim();
    // add firstName, lastName, age from the signup.handlebars
    // will i need to update my coloums and routes to accept this extra info
    // currently logging in does not work, but worked prior
    // signup does connect the user to the database and is persistent

    if (username && email && password && firstName && lastName && age) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                password,
                age
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status
        if (response.ok) {
            // send them to the right page after signing up
            document.location.replace('/');
            console.log("signed up successfully")
        } else {
            alert(response.statusText);
        }
    }
}


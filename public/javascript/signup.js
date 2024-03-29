async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/homepage/');
        } else {
            alert(response.statusText);
        }
    }
}



async function signUpHandler(e) {
    e.preventDefault();
    
    const username = document.querySelector('#usernameSignUp').value.trim();
    const email = document.querySelector('#emailSignUp').value.trim();
    const password = document.querySelector('#passwordSignUp').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status
        if (response.ok) {
            // send them to the right page after signing up
            document.location.replace('/homepage/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);
document.querySelector('.signUpForm').addEventListener('submit', signUpHandler);
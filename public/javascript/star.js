// changing this to 'star' instead of star
async function starClickHandler(event) {
    event.preventDefault();
    console.log('button was clicked');

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch ('/api/posts/star', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#star').addEventListener('click', starClickHandler);
// change the query selector to whatever the id on the button is,
// in order to target and have this function fire

// async function
async function makePost() {
    const postTitle = document.querySelector('#postTitle').value.trim();
    const postContent = document.querySelector('#postContent').value.trim();

    if (postTitle && postContent) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                postTitle,
                postContent
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        // check response
        if (response.ok) {
            document.location.replace('/api/posts');
        } else {
            alert(response.statusText);
        }
    }
    
}
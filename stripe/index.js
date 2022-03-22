const button = document.querySelector('button')

button.addEventListener('click', () => {
    fetch('https://api-dev.wusf.digital/stripe/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 1}
            ]
        })
    }).then(
        res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }
    ).then(({ url }) => {
        window.location = url
    }).catch(
        error => console.error(error)
    )
})
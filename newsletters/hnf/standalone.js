const form = document.getElementById('signUp')
const submitButton = document.getElementById('newsletterButton')

function initForm() {
    const data = {}
    form.addEventListener('submit', e => {
        e.preventDefault()
        const email = document.getElementById('inputEmail').value
        data.email_address = email
        submitButton.disabled = true
        submitToApi(data)
    })
}

async function submitToApi(data) {
    try {
        document.getElementById('submitStatus').innerHTML = "We're signing you up."
        const response = await fetch('https://api.wusf.digital/mailchimp/subscribeNewsletter?useCase=newsletter', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        
        if (response.ok) {
            document.getElementById('submitStatus').innerHTML = "Check your email to confirm."
            form.reset()
        } else {
            document.getElementById('submitStatus').innerHTML = "Uh oh! We couldn't sign you up."
        }
        
    } catch(error) {
        document.getElementById('submitStatus').innerHTML = "We're having trouble with our servers. Try again later."
    }

    submitButton.disabled = false
}

initForm()
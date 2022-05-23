function myFunction() {
    const input = document.getElementById('myInput')
    const filter = input.value.toUpperCase()
    const elements = document.querySelectorAll('p.rteBlock')

    elements.forEach(element => {
        if(element.innerText.toUpperCase().includes(filter)) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    })
}
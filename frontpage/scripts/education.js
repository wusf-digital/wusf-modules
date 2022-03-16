// DOM Elements
const sectionWrapperStories = document.querySelector('.section__wrapper--stories')

const educationHeadline1 = document.querySelector('#education__headline-1')
const educationHeadline2 = document.querySelector('#education__headline-2')
const educationHeadline3 = document.querySelector('#education__headline-3')
const educationHeadline4 = document.querySelector('#education__headline-4')

const educationDescription1 = document.querySelector('#education__description-1')
const educationDescription2 = document.querySelector('#education__description-2')
const educationDescription3 = document.querySelector('#education__description-3')
const educationDescription4 = document.querySelector('#education__description-4')

const educationImage1 = document.querySelector('#education__image-1')
const educationImage2 = document.querySelector('#education__image-2')
const educationImage3 = document.querySelector('#education__image-3')
const educationImage4 = document.querySelector('#education__image-4')

const educationHeadlineLink1 = document.querySelector('#education__headline-1--link')
const educationHeadlineLink2 = document.querySelector('#education__headline-2--link')
const educationHeadlineLink3 = document.querySelector('#education__headline-3--link')
const educationHeadlineLink4 = document.querySelector('#education__headline-4--link')

const educationButtonLink1 = document.querySelector('#education__headline-1--button')
const educationButtonLink2 = document.querySelector('#education__headline-2--button')
const educationButtonLink3 = document.querySelector('#education__headline-3--button')
const educationButtonLink4 = document.querySelector('#education__headline-4--button')

getEducation()
    .then(
        res => {
            /* Stop the loading spinner */
            hideLoadingSpinner()

            educationHeadline1.innerHTML = res[0].title
            educationHeadline2.innerHTML = res[1].title
            educationHeadline3.innerHTML = res[2].title
            educationHeadline4.innerHTML = res[3].title

            educationHeadline1.href = res[0].link[0]

            educationDescription1.innerHTML = res[0].description[0]
            educationDescription2.innerHTML = res[1].description[0]
            educationDescription3.innerHTML = res[2].description[0]
            educationDescription4.innerHTML = res[3].description[0]

            educationImage1.src = res[0]['media:content'][0].$.url
            educationImage2.src = res[1]['media:content'][0].$.url
            educationImage3.src = res[2]['media:content'][0].$.url
            educationImage4.src = res[3]['media:content'][0].$.url

            educationHeadlineLink1.href = res[0].link[0]
            educationHeadlineLink2.href = res[1].link[0]
            educationHeadlineLink3.href = res[2].link[0]
            educationHeadlineLink4.href = res[3].link[0]

            educationButtonLink1.href = res[0].link[0]
            educationButtonLink2.href = res[1].link[0]
            educationButtonLink3.href = res[2].link[0]
            educationButtonLink4.href = res[3].link[0]

            educationButtonLink1.textContent = 'Read More'
            educationButtonLink1.classList.add('button__read-more', 'button__read-more--section-story')

            educationButtonLink2.textContent = 'Read More'
            educationButtonLink2.classList.add('button__read-more', 'button__read-more--section-story')

            educationButtonLink3.textContent = 'Read More'
            educationButtonLink3.classList.add('button__read-more', 'button__read-more--section-story')

            educationButtonLink4.textContent = 'Read More'
            educationButtonLink4.classList.add('button__read-more', 'button__read-more--section-story')
        }
    )
    .catch(
        err => {
            console.log(err)
            sectionWrapperStories.innerHTML = ' '
        })
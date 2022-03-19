// DOM Elements
const localStateHeadline1 = document.querySelector('#localState__headline-1')
const localStateHeadline2 = document.querySelector('#localState__headline-2')
const localStateHeadline3 = document.querySelector('#localState__headline-3')
const localStateHeadline4 = document.querySelector('#localState__headline-4')

const localStateDescription1 = document.querySelector('#localState__description-1')
const localStateDescription2 = document.querySelector('#localState__description-2')
const localStateDescription3 = document.querySelector('#localState__description-3')
const localStateDescription4 = document.querySelector('#localState__description-4')

const localStateImage1 = document.querySelector('#localState__image-1')
const localStateImage2 = document.querySelector('#localState__image-2')
const localStateImage3 = document.querySelector('#localState__image-3')
const localStateImage4 = document.querySelector('#localState__image-4')

const localStateHeadlineLink1 = document.querySelector('#localState__headline-1--link')
const localStateHeadlineLink2 = document.querySelector('#localState__headline-2--link')
const localStateHeadlineLink3 = document.querySelector('#localState__headline-3--link')
const localStateHeadlineLink4 = document.querySelector('#localState__headline-4--link')

const localStateButtonLink1 = document.querySelector('#localState__headline-1--button')
const localStateButtonLink2 = document.querySelector('#localState__headline-2--button')
const localStateButtonLink3 = document.querySelector('#localState__headline-3--button')
const localStateButtonLink4 = document.querySelector('#localState__headline-4--button')


getData('https://api-dev.wusf.digital/grove/localState')
    .then(
        res => {
            /* Stop the loading spinner */
            hideLoadingSpinner()
            
            localStateHeadline1.innerHTML = res[0].title
            localStateHeadline2.innerHTML = res[1].title
            localStateHeadline3.innerHTML = res[2].title
            localStateHeadline4.innerHTML = res[3].title

            localStateHeadline1.href = res[0].link[0]

            localStateDescription1.innerHTML = res[0].description[0]
            localStateDescription2.innerHTML = res[1].description[0]
            localStateDescription3.innerHTML = res[2].description[0]
            localStateDescription4.innerHTML = res[3].description[0]

            localStateImage1.src = res[0]['media:content'][0].$.url
            localStateImage2.src = res[1]['media:content'][0].$.url
            localStateImage3.src = res[2]['media:content'][0].$.url
            localStateImage4.src = res[3]['media:content'][0].$.url

            localStateHeadlineLink1.href = res[0].link[0]
            localStateHeadlineLink2.href = res[1].link[0]
            localStateHeadlineLink3.href = res[2].link[0]
            localStateHeadlineLink4.href = res[3].link[0]

            localStateButtonLink1.href = res[0].link[0]
            localStateButtonLink2.href = res[1].link[0]
            localStateButtonLink3.href = res[2].link[0]
            localStateButtonLink4.href = res[3].link[0]

            localStateButtonLink1.textContent = 'Read More'
            localStateButtonLink1.classList.add('button__read-more', 'button__read-more--section-story')

            localStateButtonLink2.textContent = 'Read More'
            localStateButtonLink2.classList.add('button__read-more', 'button__read-more--section-story')

            localStateButtonLink3.textContent = 'Read More'
            localStateButtonLink3.classList.add('button__read-more', 'button__read-more--section-story')

            localStateButtonLink4.textContent = 'Read More'
            localStateButtonLink4.classList.add('button__read-more', 'button__read-more--section-story')
        }
    )
    .catch(
        err => {
            console.log(err)
            sectionWrapperStories.innerHTML = ' '
        }
    )
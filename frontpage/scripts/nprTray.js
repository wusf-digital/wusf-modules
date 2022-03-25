// DOM Elements
const nprNewsHeadline1 = document.querySelector('#nprNews__headline-1')
const nprNewsHeadline2 = document.querySelector('#nprNews__headline-2')
const nprNewsHeadline3 = document.querySelector('#nprNews__headline-3')
const nprNewsHeadline4 = document.querySelector('#nprNews__headline-4')

const nprNewsDescription1 = document.querySelector('#nprNews__description-1')
const nprNewsDescription2 = document.querySelector('#nprNews__description-2')
const nprNewsDescription3 = document.querySelector('#nprNews__description-3')
const nprNewsDescription4 = document.querySelector('#nprNews__description-4')

const nprNewsImage1 = document.querySelector('#nprNews__image-1')
const nprNewsImage2 = document.querySelector('#nprNews__image-2')
const nprNewsImage3 = document.querySelector('#nprNews__image-3')
const nprNewsImage4 = document.querySelector('#nprNews__image-4')

const nprNewsHeadlineLink1 = document.querySelector('#nprNews__headline-1--link')
const nprNewsHeadlineLink2 = document.querySelector('#nprNews__headline-2--link')
const nprNewsHeadlineLink3 = document.querySelector('#nprNews__headline-3--link')
const nprNewsHeadlineLink4 = document.querySelector('#nprNews__headline-4--link')

const nprNewsButtonLink1 = document.querySelector('#nprNews__headline-1--button')
const nprNewsButtonLink2 = document.querySelector('#nprNews__headline-2--button')
const nprNewsButtonLink3 = document.querySelector('#nprNews__headline-3--button')
const nprNewsButtonLink4 = document.querySelector('#nprNews__headline-4--button')

getData('https://api-dev.wusf.digital/grove/nprTray')
    .then(
        res => {
            /* Stop the loading spinner */
            hideLoadingSpinner()

            nprNewsHeadline1.innerHTML = res[0].title
            nprNewsHeadline2.innerHTML = res[1].title
            nprNewsHeadline3.innerHTML = res[2].title
            nprNewsHeadline4.innerHTML = res[3].title

            nprNewsHeadline1.href = res[0].link[0]

            nprNewsDescription1.innerHTML = res[0].description[0]
            nprNewsDescription2.innerHTML = res[1].description[0]
            nprNewsDescription3.innerHTML = res[2].description[0]
            nprNewsDescription4.innerHTML = res[3].description[0]

            nprNewsImage1.style.backgroundImage=`url(${res[0]['media:content']?.[0].$.url ?? nprLogo})`
            nprNewsImage2.style.backgroundImage=`url(${res[1]['media:content']?.[0].$.url ?? nprLogo})`
            nprNewsImage3.style.backgroundImage=`url(${res[2]['media:content']?.[0].$.url ?? nprLogo})`
            nprNewsImage4.style.backgroundImage=`url(${res[3]['media:content']?.[0].$.url ?? nprLogo})`

            nprNewsHeadlineLink1.href = res[0].link[0]
            nprNewsHeadlineLink2.href = res[1].link[0]
            nprNewsHeadlineLink3.href = res[2].link[0]
            nprNewsHeadlineLink4.href = res[3].link[0]

            nprNewsButtonLink1.href = res[0].link[0]
            nprNewsButtonLink2.href = res[1].link[0]
            nprNewsButtonLink3.href = res[2].link[0]
            nprNewsButtonLink4.href = res[3].link[0]

            nprNewsButtonLink1.textContent = 'Read More'
            nprNewsButtonLink1.classList.add('button__read-more', 'button__read-more--section-story')

            nprNewsButtonLink2.textContent = 'Read More'
            nprNewsButtonLink2.classList.add('button__read-more', 'button__read-more--section-story')

            nprNewsButtonLink3.textContent = 'Read More'
            nprNewsButtonLink3.classList.add('button__read-more', 'button__read-more--section-story')

            nprNewsButtonLink4.textContent = 'Read More'
            nprNewsButtonLink4.classList.add('button__read-more', 'button__read-more--section-story')
        }
    )
    .catch(
        err => {
            console.log(err)
            sectionWrapperStories.innerHTML = ' '
        })
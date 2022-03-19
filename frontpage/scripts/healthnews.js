// DOM Elements
const healthNewsHeadline1 = document.querySelector('#health-news__headline-1')
const healthNewsHeadline2 = document.querySelector('#health-news__headline-2')
const healthNewsHeadline3 = document.querySelector('#health-news__headline-3')
const healthNewsHeadline4 = document.querySelector('#health-news__headline-4')

const healthNewsDescription1 = document.querySelector('#health-news__description-1')
const healthNewsDescription2 = document.querySelector('#health-news__description-2')
const healthNewsDescription3 = document.querySelector('#health-news__description-3')
const healthNewsDescription4 = document.querySelector('#health-news__description-4')

const healthNewsImage1 = document.querySelector('#health-news__image-1')
const healthNewsImage2 = document.querySelector('#health-news__image-2')
const healthNewsImage3 = document.querySelector('#health-news__image-3')
const healthNewsImage4 = document.querySelector('#health-news__image-4')

const healthNewsHeadlineLink1 = document.querySelector('#health-news__headline-1--link')
const healthNewsHeadlineLink2 = document.querySelector('#health-news__headline-2--link')
const healthNewsHeadlineLink3 = document.querySelector('#health-news__headline-3--link')
const healthNewsHeadlineLink4 = document.querySelector('#health-news__headline-4--link')

const healthNewsButtonLink1 = document.querySelector('#health-news__headline-1--button')
const healthNewsButtonLink2 = document.querySelector('#health-news__headline-2--button')
const healthNewsButtonLink3 = document.querySelector('#health-news__headline-3--button')
const healthNewsButtonLink4 = document.querySelector('#health-news__headline-4--button')

getData('https://api-dev.wusf.digital/grove/healthNewsFlorida')
    .then(
        res => {
            /* Stop the loading spinner */
            hideLoadingSpinner()
            
            healthNewsHeadline1.innerHTML = res[0].title
            healthNewsHeadline2.innerHTML = res[1].title
            healthNewsHeadline3.innerHTML = res[2].title
            healthNewsHeadline4.innerHTML = res[3].title

            healthNewsHeadline1.href = res[0].link[0]

            healthNewsDescription1.innerHTML = res[0].description[0]
            healthNewsDescription2.innerHTML = res[1].description[0]
            healthNewsDescription3.innerHTML = res[2].description[0]
            healthNewsDescription4.innerHTML = res[3].description[0]

            healthNewsImage1.src = res[0]['media:content'][0].$.url
            healthNewsImage2.src = res[1]['media:content'][0].$.url
            healthNewsImage3.src = res[2]['media:content'][0].$.url
            healthNewsImage4.src = res[3]['media:content'][0].$.url

            healthNewsHeadlineLink1.href = res[0].link[0]
            healthNewsHeadlineLink2.href = res[1].link[0]
            healthNewsHeadlineLink3.href = res[2].link[0]
            healthNewsHeadlineLink4.href = res[3].link[0]

            healthNewsButtonLink1.href = res[0].link[0]
            healthNewsButtonLink2.href = res[1].link[0]
            healthNewsButtonLink3.href = res[2].link[0]
            healthNewsButtonLink4.href = res[3].link[0]

            healthNewsButtonLink1.textContent = 'Read More'
            healthNewsButtonLink1.classList.add('button__read-more', 'button__read-more--section-story')

            healthNewsButtonLink2.textContent = 'Read More'
            healthNewsButtonLink2.classList.add('button__read-more', 'button__read-more--section-story')

            healthNewsButtonLink3.textContent = 'Read More'
            healthNewsButtonLink3.classList.add('button__read-more', 'button__read-more--section-story')

            healthNewsButtonLink4.textContent = 'Read More'
            healthNewsButtonLink4.classList.add('button__read-more', 'button__read-more--section-story')
        }
    )
    .catch(err => {
        console.log(err)
        sectionWrapperStories.innerHTML = ' '
    })
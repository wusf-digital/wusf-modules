// DOM Elements
const headline = document.querySelector('#top-story__headline')
const headlineLink = document.querySelector('#top-story__headline--link')
const topStoryTeaser = document.querySelector('#top-story__headline--teaser')
const topStoryButtonLink = document.querySelector('#top-story__button--link')
const topStoryImage = document.querySelector('.top-story__image')

getTopStory()
    .then(
        res => {
            headline.innerHTML = res[0].title['$text']
            headlineLink.href = res[0].link[0]['$text']
            topStoryTeaser.innerHTML = res[0].teaser['$text']
            topStoryButtonLink.href = res[0].link[0]['$text']
            topStoryImage.src = res[0].image[0].src
        }
    )
    .catch(
        err => console.log(err)
    )
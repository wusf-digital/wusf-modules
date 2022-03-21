// DOM Elements
const headlineWrapper = document.querySelector('.top-story__wrapper')
const headline = document.querySelector('#top-story__headline')
const headlineLink = document.querySelector('#top-story__headline--link')
const topStoryTeaser = document.querySelector('#top-story__headline--teaser')
const topStoryButtonLink = document.querySelector('#top-story__button--link')
const topStoryImage = document.querySelector('.top-story__image')

getData('https://api.wusf.digital/grove/topStory')
    .then(
        res => {
            /* Stop the loading spinner */
            hideLoadingSpinner()
            /*
            Check to see if there are any top stories. The tag of the
            story must be WUSF. If there are no stories matching that tag,
            display the latest headline from the local/state section.
            */
            if (Array.isArray(res) && res.length === 0) {
                getData('https://api.wusf.digital/grove/localState')
                .then(
                    res => {
                        headline.innerHTML = res[0].title
                        headlineLink.href = res[0].link[0]
                        topStoryTeaser.innerHTML = res[0].description[0]
                        topStoryButtonLink.href = res[0].link[0]
                        topStoryButtonLink.classList.add('button__read-more')
                        topStoryButtonLink.textContent = 'READ MORE'
                        topStoryImage.src = res[0]['media:content'][0].$.url
                    }
                ).catch(
                    err => {
                        console.log(err)
                        headlineWrapper.innerHTML = ' '
                    }
                )
                return
            }

            /* 
            If above condition fails (most of the time it will), then
            display the top stories from the NPR API
            */
            headline.innerHTML = res[0].title['$text']
            headlineLink.href = res[0].link[0]['$text']
            topStoryTeaser.innerHTML = res[0].teaser['$text']
            topStoryButtonLink.href = res[0].link[0]['$text']
            topStoryButtonLink.classList.add('button__read-more')
            topStoryButtonLink.textContent = 'READ MORE'
            topStoryImage.src = res[0].image[0].src
        }
    )
    .catch(
        err => {
            console.log(err)
            headlineWrapper.innerHTML = ' ' 
        }
    )
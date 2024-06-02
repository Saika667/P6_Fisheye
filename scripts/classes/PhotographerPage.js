import { registerLikeEvents, registerMediaLinksEvents } from '../pages/photographer.js'
import { informationPhotographerTemplate, photographerMediasTemplate, photographerPortraitTemplate } from '../templates/photographer.js'
import FetchData from './FetchData.js'
import Lightbox from './Lightbox.js'

export const ORDER_POPULARITY = 'popularity'
export const ORDER_DATE = 'date'
export const ORDER_TITLE = 'title'

class PhotographerPage {
    constructor (photographerId) {
        this.fetch = new FetchData('../../../data/photographers.json')
        this.photographerId = photographerId
        this.medias = null
        this.lightbox = null
    }

    async displayData () {
        if (!this.medias) {
            this.medias = await this.fetch.getPhotographerMedias(this.photographerId)
        }
        const photograph = await this.fetch.getPhotographerById(this.photographerId)

        const photographerHeader = document.querySelector('.photograph-header')
        const contactButton = document.querySelector('.contact-button')
        photographerHeader.insertBefore(informationPhotographerTemplate(photograph), contactButton)
        photographerHeader.appendChild(photographerPortraitTemplate(photograph))

        const contactPhotograhperName = document.getElementById('contact-photographer-name')
        contactPhotograhperName.innerHTML = photograph.name

        const photographerPricing = document.querySelector('.counter-price')
        photographerPricing.innerHTML = photograph.price + ' €/jour'

        this.displayTotalLikes()
        this.order(ORDER_POPULARITY)
        this.displayMedias()
    }

    displayTotalLikes () {
        const likesContainer = document.querySelector('.counter-container span')
        likesContainer.innerHTML = this.medias.reduce((acc, curr) => acc + curr.likes, 0)
    }

    displayMedias () {
        const photographerBody = document.querySelector('.photograph-body')
        photographerBody.innerHTML = ''
        this.medias.forEach((element, index) => {
            photographerBody.appendChild(photographerMediasTemplate(element, index))
            if (index === this.medias.length - 1) {
                registerLikeEvents()
                registerMediaLinksEvents()
            }
        })
        this.lightbox = new Lightbox(this.medias)
    }

    order (type) {
        switch (type) {
        case ORDER_DATE :
            this.medias.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
        case ORDER_POPULARITY:
            this.medias.sort((a, b) => b.likes - a.likes)
            break
        case ORDER_TITLE:
            this.medias.sort((a, b) => a.title.localeCompare(b.title))
            break
        }
        this.displayMedias()
    }
}

export default PhotographerPage

import { informationPhotographerTemplate, photographerMediasTemplate, photographerPortraitTemplate } from '../templates/photographer.js'
import FetchData from './FetchData.js'

class PhotographerPage {
    constructor (photographerId) {
        this._fetch = new FetchData('../../../data/photographers.json')
        this._photographerId = photographerId
    }

    async displayData () {
        const photographerMedias = await this._fetch.getPhotographerMedias(this._photographerId)
        const photograph = await this._fetch.getPhotographerById(this._photographerId)

        const photographerHeader = document.querySelector('.photograph-header')
        const contactButton = document.querySelector('.contact_button')
        photographerHeader.insertBefore(informationPhotographerTemplate(photograph), contactButton)
        photographerHeader.appendChild(photographerPortraitTemplate(photograph))

        const photographerBody = document.querySelector('.photograph-body')
        photographerMedias.forEach(element => {
            const mediaType = element.hasOwnProperty('image') ? 'image' : 'video'
            photographerBody.appendChild(photographerMediasTemplate(element, mediaType))
        })
    }
}

export default PhotographerPage

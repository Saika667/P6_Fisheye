import FetchData from '../classes/FetchData.js'
import { photographerTemplate } from '../templates/photographer.js'

class HomePage {
    constructor () {
        this._fetch = new FetchData('../../../data/photographers.json')
    }

    async displayData () {
        const photographers = await this._fetch.getPhotographers()
        const photographersSection = document.querySelector('.photographer')

        photographers.forEach((photographer) => {
            photographersSection.appendChild(photographerTemplate(photographer))
        })
    }
}

export default HomePage

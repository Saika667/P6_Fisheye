class FetchData {
    constructor (url) {
        this._url = url
        this._data = null
    }

    async getData () {
        this.data = await fetch(this._url)
            .then((data) => data.json())
        console.log(this.data)
    }

    async getPhotographers () {
        if (this._data === null) {
            await this.getData()
        }
        return this.data.photographers
    }

    async getPhotographerById (photographerId) {
        if (this._data === null) {
            await this.getData()
        }
        return this.data.photographers.find(photograph => photograph.id === parseInt(photographerId))
    }

    async getPhotographerMedias (photographerId) {
        if (this._data === null) {
            await this.getData()
        }
        return this.data.media.filter(media => media.photographerId === parseInt(photographerId))
    }
}

export default FetchData

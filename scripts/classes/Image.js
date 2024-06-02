class Image {
    constructor (media) {
        this.media = media
    }

    displayData () {
        return `<img class="photograph-body-article-image" src="assets/photographers/${this.media.image}" alt="${this.media.title}" />`
    }

    displayLightboxData () {
        return `<img src="assets/photographers/${this.media.image}" alt="${this.media.title}"/>
                <h3>${this.media.title}</h3>`
    }
}

export default Image

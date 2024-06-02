import MediaFactory from './MediaFactory.js'

class Lightbox {
    constructor (medias) {
        this.medias = medias
        this.index = null
        this.lightboxElement = document.querySelector('.image')
        this.currentImageElement = document.querySelector('.image-container-img-wrapper-title')
    }

    show (index) {
        this.lightboxElement.style.display = 'flex'
        this.lightboxElement.setAttribute('aria-hidden', false)
        this.index = parseInt(index)
        this.fillMedia()
    }

    isShowed () {
        return this.lightboxElement.style.display === 'flex'
    }

    fillMedia () {
        const mediaFactory = new MediaFactory(this.medias[this.index])
        this.currentImageElement.innerHTML = mediaFactory.media.displayLightboxData()
    }

    close () {
        this.lightboxElement.style.display = 'none'
        this.lightboxElement.setAttribute('aria-hidden', true)
    }

    showNext () {
        const nextIndex = this.index + 1 > this.medias.length - 1 ? 0 : this.index + 1
        this.index = nextIndex
        this.fillMedia()
    }

    showBefore () {
        const previousIndex = this.index - 1 < 0 ? this.medias.length - 1 : this.index - 1
        this.index = previousIndex
        this.fillMedia()
    }
}

export default Lightbox

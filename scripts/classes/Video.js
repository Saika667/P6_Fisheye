class Video {
    constructor (media) {
        this.media = media
    }

    displayData () {
        return `<video controls class="photograph-body-article-image">
                    <source src="assets/photographers/${this.media.video}" type="video/mp4" />
                </video>`
    }

    displayLightboxData () {
        return `<video controls class="photograph-body-article-image">
                    <source src="assets/photographers/${this.media.video}" type="video/mp4" />
                </video>
                <h3>${this.media.title}</h3>`
    }
}

export default Video

import Video from './Video.js'
import Image from './Image.js'

class MediaFactory {
    constructor (media) {
        if (Object.prototype.hasOwnProperty.call(media, 'image')) {
            this.media = new Image(media)
        } else if (Object.prototype.hasOwnProperty.call(media, 'video')) {
            this.media = new Video(media)
        }
    }
}

export default MediaFactory

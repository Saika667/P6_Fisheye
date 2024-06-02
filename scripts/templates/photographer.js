import MediaFactory from '../classes/MediaFactory.js'

const photographerTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <article class="photographer-article">
            <a class="photographer-article-link" href="photographer.html?id=${data.id}" aria-label="Lien vers la page photographe de ${data.name}">
                <div class="photographer-article-image">
                    <img src="assets/photographers/${data.portrait}" alt="Photo de portrait de ${data.name}"/>
                </div>
                <h2 aria-label="Nom du photographe">${data.name}</h2>
            </a>
            <span class="photographer-article-locate" aria-label="Localisation du photographe">${data.city}, ${data.country}</span>
            <span class="photographer-article-slogan" aria-label="Phrase d'accroche du photographe">${data.tagline}</span>
            <span class="photographer-article-price" aria-label="Prix à la journée du photographe">${data.price}€/jour</span>
        </article>
    `)
}

const photographerMediasTemplate = (data, index) => {
    const mediaFactory = new MediaFactory(data)
    const mediaHtml = mediaFactory.media.displayData()

    return document.createRange().createContextualFragment(`
        <article class="photograph-body-article">
            <a href='#' data-media-index="${index}" aria-label="Lien vers l'aperçu de média">
                ${mediaHtml}
            </a>
            <div class="photograph-body-article-information">
                <p>${data.title}</p>
                <div class="photograph-body-article-information-like">
                    <span aria-label="Nombre de like">${data.likes}</span>
                    <button class="photograph-body-article-information-like-button" type="button" aria-label="Bouton d'ajout de like">
                        <img class="photograph-body-article-information-like-button-icon" src="assets/icons/heart.svg" alt="coeur" />
                    </button>
                </div>
            </div>
        </article>
    `)
}

const informationPhotographerTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <div>
            <h1 aria-label="Nom du photographe">${data.name}</h1>
            <p class="photograph-header-locate" aria-label="Localisation du photographe">${data.city}, ${data.country}</p>
            <p class="photograph-header-tag" aria-label="Phrase d'accorche du photographe">${data.tagline}</p>
        </div>
    `)
}

const photographerPortraitTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <div class="photograph-header-portrait">
            <img src="assets/photographers/${data.portrait}" alt="Photo du portrait du photographe"/>
        </div>
    `)
}

const filterButtonTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <button class="photograph-menu-container-select-button" type="button">${data}</button>
    `)
}

export { photographerTemplate, photographerMediasTemplate, informationPhotographerTemplate, photographerPortraitTemplate, filterButtonTemplate }

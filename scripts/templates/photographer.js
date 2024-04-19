const photographerTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <article class="photographer-article">
            <a href="photographer.html?id=${data.id}">
                <div class="photographer-article-image">
                    <img src="assets/photographers/${data.portrait}" />
                </div>
                <h2>${data.name}</h2>
            </a>
            <span class="photographer-article-locate">${data.city}, ${data.country}</span>
            <span class="photographer-article-slogan">${data.tagline}</span>
            <span class="photographer-article-price">${data.price}€/jour</span>
        </article>
    `)
}

const photographerMediasTemplate = (data, mediaType) => {
    const media = mediaType === 'image'
        ? `<img class="photograph-body-article-image" src="assets/photographers/${data.image}" alt="${data.title}" />`
        : `<video controls class="photograph-body-article-image">
            <source src="assets/photographers/${data.video}" type="video/mp4" />
        </video>`

    return document.createRange().createContextualFragment(`
        <article class="photograph-body-article">
            ${media}
            <div class="photograph-body-article-information">
                <p>${data.title}</p>
                <div class="photograph-body-article-information-counter">
                    <span>11</span>
                    <img class="photograph-body-article-information-counter-icon" src="assets/images/heart.svg" alt="coeur" />
                </div>
            </div>
        </article>
    `)
}

const informationPhotographerTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <div>
            <h1>${data.name}</h1>
            <p class="photograph-header-locate">${data.city}, ${data.country}</p>
            <p class="photograph-header-tag">${data.tagline}</p>
        </div>
    `)
}

const photographerPortraitTemplate = (data) => {
    return document.createRange().createContextualFragment(`
        <div class="photograph-header-portrait">
            <img src="assets/photographers/${data.portrait}" />
        </div>
    `)
}

// const photographerTemplate = (data) => {
//     const { name, portrait } = data

//     const picture = `assets/photographers/${portrait}`

//     function getUserCardDOM () {
//         const article = document.createElement('article')
//         const img = document.createElement('img')
//         img.setAttribute('src', picture)
//         const h2 = document.createElement('h2')
//         h2.textContent = name
//         article.appendChild(img)
//         article.appendChild(h2)
//         return (article)
//     }
//     return { name, picture, getUserCardDOM }
// }

export { photographerTemplate, photographerMediasTemplate, informationPhotographerTemplate, photographerPortraitTemplate }

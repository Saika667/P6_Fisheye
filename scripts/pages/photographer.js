import PhotographerPage, { ORDER_DATE, ORDER_POPULARITY, ORDER_TITLE } from '../classes/PhotographerPage.js'

// Mettre le code JavaScript lié à la page photographer.html
const queryString = window.location.search
const param = new URLSearchParams(queryString)
const photographerId = param.get('id')
const photographerPage = new PhotographerPage(photographerId)

// --------------------------------gestion du select custom--------------------------------
const arrowButton = document.getElementById('arrow-button')
const propositionsContainer = document.getElementById('select-container')
const currentfilter = document.getElementById('filter')
const filterButton = document.getElementsByClassName('photograph-menu-container-select-button')
const filtersTable = { Date: ORDER_DATE, Popularité: ORDER_POPULARITY, Titre: ORDER_TITLE }

for (const button of filterButton) {
    button.addEventListener('click', (e) => {
        const selectedFilter = e.target.innerText
        currentfilter.innerText = selectedFilter
        const newFilters = [...Object.keys(filtersTable)]
        newFilters.splice(newFilters.indexOf(selectedFilter), 1)
        propositionsContainer.style.display = 'none'
        propositionsContainer.setAttribute('aria-expanded', false)
        arrowButton.style.borderRadius = '5px'
        newFilters.forEach((newFilter, index) => {
            filterButton[index].innerHTML = newFilter
            filterButton[index].setAttribute('aria-label', `bouton filtre ${newFilter}`)
        })
        photographerPage.order(filtersTable[selectedFilter])
    })
}

arrowButton.addEventListener('click', () => {
    // on définit à none par défaut
    const previousDisplay = propositionsContainer.style.display || 'none'
    propositionsContainer.style.display = previousDisplay === 'block' ? 'none' : 'block'
    if (previousDisplay === 'none') {
        propositionsContainer.setAttribute('aria-expanded', true)
        arrowButton.style.borderRadius = '5px 5px 0 0'
        propositionsContainer.style.borderRadius = '0 0 5px 5px'
    } else {
        propositionsContainer.setAttribute('aria-expanded', false)
        arrowButton.style.borderRadius = '5px'
    }
})
// --------------------------------fin gestion du select custom--------------------------------

// --------------------------------gestion du formulaire de contact--------------------------------
const contactForm = document.getElementById('contact_modal')
const closeFormButton = document.getElementById('close_button')
const sendFormButton = document.getElementById('send_button')
const displayFormButton = document.getElementById('contact_button')
const firstNameInput = document.getElementById('first')
const lastNameInput = document.getElementById('last')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const firstNameInputError = document.getElementById('error-first')
const lastNameInputError = document.getElementById('error-last')
const emailInputError = document.getElementById('error-email')
const messageInputError = document.getElementById('error-message')

// ouvre la modal
displayFormButton.addEventListener('click', () => {
    contactForm.style.display = 'flex'
    contactForm.focus()
    contactForm.setAttribute('aria-hidden', false)
})

// ferme la modal
closeFormButton.addEventListener('click', () => {
    contactForm.style.display = 'none'
    contactForm.setAttribute('aria-hidden', true)
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        contactForm.style.display = 'none'
        contactForm.setAttribute('aria-hidden', true)
    }
})
// N'accepte que des lettres, les accents, les espaces et le tiret ("-") et minimum 2 caractères
const regexNames = /^[A-Za-zÀ-ÿ\s-]{2,}$/
// accepte s'il y a une suite de caractère avant et après le @ et que cette string se termine d'un point suivi d'au moins 2 caractères
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// validation du formulaire de contact
const validateForm = () => {
    let isValid = true

    if (!regexNames.test(firstNameInput.value)) {
        isValid = false
        firstNameInputError.innerText = 'Ce champ ne peut contenir que des lettres ou tiret et doit avoir minimum 2 caractères.'
    } else if (firstNameInput.value === '') {
        isValid = false
        firstNameInputError.innerText = 'Ce champ ne peut pas être vide.'
    } else {
        firstNameInputError.innerText = ''
    }

    if (!regexNames.test(lastNameInput.value)) {
        isValid = false
        lastNameInputError.innerText = 'Ce champ ne peut contenir que des lettres ou tiret et doit avoir minimum 2 caractères.'
    } else if (lastNameInput.value === '') {
        isValid = false
        lastNameInputError.innerText = 'Ce champ ne peut pas être vide.'
    } else {
        lastNameInputError.innerText = ''
    }

    if (!regexEmail.test(emailInput.value)) {
        isValid = false
        emailInputError.innerText = 'L\'email saisie n\'est pas valide.'
    } else if (emailInput.value === '') {
        isValid = false
        emailInputError.innerText = 'Ce champ ne peut pas être vide.'
    } else {
        emailInputError.innerText = ''
    }

    if (messageInput.value === '') {
        isValid = false
        messageInputError.innerText = 'Ce champ ne peut pas être vide.'
    } else {
        messageInputError.innerText = ''
    }

    if (!isValid) {
        return
    }

    const inputObject = {
        fisrtName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        message: messageInput.value
    }

    contactForm.style.display = 'none'
    console.log(inputObject)
}

// envoi du formulaire
sendFormButton.addEventListener('click', (e) => {
    e.preventDefault()
    validateForm()
})
// --------------------------------fin de gestion du formulaire de contact--------------------------------

// --------------------------------gestion tab du formulaire de contact--------------------------------
document.querySelector('input[tabindex="103"]').addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        document.querySelector('button[tabindex="108"]').focus()
    }
})

document.querySelector('button[tabindex="108"]').addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        document.querySelector('input[tabindex="103"]').focus()
    }
})
// --------------------------------fin de gestion tab du formulaire de contact--------------------------------

// --------------------------------gestion des likes--------------------------------
// suppression puis ajout du listener appelé pour éviter les incohérences après un tri des médias
export const registerLikeEvents = () => {
    const likeButtons = document.getElementsByClassName('photograph-body-article-information-like-button')

    for (const likeButton of likeButtons) {
        likeButton.removeEventListener('click', likeFunction)
        likeButton.addEventListener('click', likeFunction)
    }
}

// ajout ou suppression de like
const likeFunction = (e) => {
    const likesElement = e.currentTarget.parentNode.querySelector('span')
    const likesCounter = parseInt(likesElement.innerText)
    const totalLikes = document.querySelector('.counter-container span')
    if (e.currentTarget.classList.contains('liked')) {
        likesElement.innerText = likesCounter - 1
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) - 1
    } else {
        likesElement.innerText = likesCounter + 1
        totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1
    }
    e.currentTarget.classList.toggle('liked')
}
// --------------------------------fin de gestion des likes--------------------------------

// -------------------------------- gestion du lightbox--------------------------------
// suppression puis ajout du listener appelé pour éviter les incohérence après un tri des médias
export const registerMediaLinksEvents = () => {
    const mediasLinks = document.querySelectorAll('.photograph-body-article a')
    for (const mediaLink of mediasLinks) {
        mediaLink.removeEventListener('click', openMediaFunction)
        mediaLink.addEventListener('click', openMediaFunction)
    }
}

// ouvre l'aperçu du media
const openMediaFunction = (e) => {
    photographerPage.lightbox.show(e.currentTarget.dataset.mediaIndex)
    document.querySelector('.image').focus()
}

// ferme l'aperçu du média
const closeLightboxButton = document.querySelector('.image-container-after-close')
closeLightboxButton.addEventListener('click', () => {
    photographerPage.lightbox.close()
})

document.querySelector('.image').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        photographerPage.lightbox.close()
    }
})

// affiche le média suivant
const nextLightboxButton = document.querySelector('.image-container-after-button')
nextLightboxButton.addEventListener('click', () => {
    photographerPage.lightbox.showNext()
})

// affiche le média précédent
const previousLightboxButton = document.querySelector('.image-container-before-button')
previousLightboxButton.addEventListener('click', () => {
    photographerPage.lightbox.showBefore()
})
// --------------------------------fin gestion du lightbox--------------------------------

await photographerPage.displayData()

// --------------------------------gestion tab lightbox ------------------------------------
document.querySelector('button[tabindex="102"]').addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        document.querySelector('button[tabindex="100"]').focus()
    }
})

document.querySelector('button[tabindex="100"]').addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        document.querySelector('button[tabindex="102"]').focus()
    }
})

// flèche de droite et gauche du clavier
document.addEventListener('keydown', (e) => {
    if (!photographerPage.lightbox.isShowed()) {
        return
    }

    if (e.key === 'ArrowLeft') {
        photographerPage.lightbox.showBefore()
    } else if (e.key === 'ArrowRight') {
        photographerPage.lightbox.showNext()
    }
})
// --------------------------------fin gestion tab lightbox --------------------------------

// -------------------------------- gestion tabindex medias --------------------------------

const likeButtons = document.getElementsByClassName('photograph-body-article-information-like-button')

likeButtons[likeButtons.length - 1].addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        document.querySelector('#home_link').focus()
    }
})

// --------------------------------fin gestion tabindex medias --------------------------------

import PhotographerPage from '../classes/PhotographerPage.js'
import { filterButtonTemplate } from '../templates/photographer.js'

// Mettre le code JavaScript lié à la page photographer.html
const queryString = window.location.search
const param = new URLSearchParams(queryString)
const photographerId = param.get('id')
const photographerPage = new PhotographerPage(photographerId)
photographerPage.displayData()

// gestion du select custom
const arrowButton = document.getElementById('arrow-button')
const propositionsContainer = document.getElementById('select-container')
const currentfilter = document.getElementById('filter')
const filterButton = document.getElementsByClassName('photograph-menu-container-select-button')
console.log(filterButton)
const filtersTable = ['Popularité', 'Date', 'Titre']

// filtersTable.forEach(filter => {
//     if (filter !== currentfilter.innerText) {
//         propositionsContainer.appendChild(filterButtonTemplate(filter))
//     }
// })

for (const button of filterButton) {
    button.addEventListener('click', (e) => {
        currentfilter.innerText = e.target.innerText
        const newFilters = [...filtersTable]
        newFilters.splice(newFilters.indexOf(e.target.innerText), 1)
        propositionsContainer.style.display = 'none'
        arrowButton.style.borderRadius = '5px'
        newFilters.forEach((newFilter, index) => {
            filterButton[index].innerHTML = newFilter
        })
    })
}

arrowButton.addEventListener('click', () => {
    // on définit à none par défaut
    const previousDisplay = propositionsContainer.style.display || 'none'
    propositionsContainer.style.display = previousDisplay === 'block' ? 'none' : 'block'
    if (previousDisplay === 'none') {
        arrowButton.style.borderRadius = '5px 5px 0 0'
        propositionsContainer.style.borderRadius = '0 0 5px 5px'
    } else {
        arrowButton.style.borderRadius = '5px'
    }
})
// fin gestion du select custom

// gestion du formulaire de contact
const contactForm = document.getElementById('contact_modal')
const closeFormButton = document.getElementById('close_button')
const sendFormButton = document.getElementById('send_button')
const displayFormButton = document.getElementById('contact_button')

//ouvre la modal
displayFormButton.addEventListener('click', () => {
    contactForm.style.display = 'flex'
})

//ferme la modal
closeFormButton.addEventListener('click', () => {
    contactForm.style.display = 'none'
})

// fin de gestion du formulaire de contact

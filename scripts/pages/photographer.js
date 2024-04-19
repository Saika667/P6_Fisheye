import PhotographerPage from '../classes/PhotographerPage.js'

// Mettre le code JavaScript lié à la page photographer.html
const queryString = window.location.search
const param = new URLSearchParams(queryString)
const photographerId = param.get('id')
const photographerPage = new PhotographerPage(photographerId)
photographerPage.displayData()

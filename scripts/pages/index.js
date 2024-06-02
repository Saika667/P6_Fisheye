import HomePage from '../classes/HomePage.js'

const homePage = new HomePage()
await homePage.displayData()

// -------------------------------------gestion du tab-------------------------------------
const photographerLinks = document.querySelectorAll('.photographer-article-link')

photographerLinks[photographerLinks.length - 1].addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        document.querySelector('#home_link').focus()
    }
})
// -------------------------------------fin gestion du tab-------------------------------------

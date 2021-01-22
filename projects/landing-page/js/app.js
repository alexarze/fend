/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = []
let breakpoints = []
let navNode
let navHeight
let curActive = -1

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function findSections() {
    sectionList = document.querySelectorAll('section')
    sectionList.forEach((section) => {
        sections.push({
            element: section,
            nav: section.getAttribute('data-nav'),
            id: section.getAttribute('id')
        })

        breakpoints.push(section.getBoundingClientRect().top)
    })
    console.log(sections)
}

function recalc() {
    // navigation height
    navHeight = navNode.getBoundingClientRect().height

    // section heights
    for (let i = 0; i < sections.length; i++) {
        breakpoints[i] = sections[i].element.getBoundingClientRect().top + window.pageYOffset
    }

    // update the active section
    updateActive()
}

function setActive(i) {
    if (i > -1 && i < sections.length) {
        sections[i].element.classList.add('your-active-class')
        sections[i].navElement.classList.add('active')
    }
}

function unsetActive(i) {
    if (i > -1 && i < sections.length) {
        sections[i].element.classList.remove('your-active-class')
        sections[i].navElement.classList.remove('active')
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    // init
    navNode = document.getElementById('navbar__list')

    // find the sections for navigation
    findSections()

    // update the nav list
    navNode.hidden = true
    sections.forEach((section) => {
        const newItem = document.createElement('li')

        // set up newItem
        newItem.classList.add('menu__link')
        newItem.textContent = section.nav
        newItem.setAttribute('data-nav', section.id)
        newItem.addEventListener('click', scrollToAnchor)

        // add newItem to dictionary for reference
        section['navElement'] = newItem

        // append to menu
        navNode.appendChild(newItem)
    })
    navNode.hidden = false

    navHeight = navNode.getBoundingClientRect().height
}


// Add class 'active' to section when near top of viewport
function updateActive() {
    const curPosition = window.pageYOffset + Math.max(window.innerHeight / 2, navHeight)
    let newActive = -1

    for (let i = 0; i < breakpoints.length; i++) {
        if (curPosition < breakpoints[i]) {
            newActive = i - 1
            break
        } else {
            newActive = i
        }
    }

    if (newActive != curActive) {
        unsetActive(curActive)
        setActive(newActive)
        curActive = newActive
    }
}


// Scroll to anchor ID using scrollTO event
function scrollToAnchor(event) {
    const element = document.getElementById(event.target.getAttribute('data-nav'))
    const top = element.getBoundingClientRect().top
    const height = navHeight
    const yOffset = window.pageYOffset

    window.scrollTo({
        top: top - height + yOffset,
        behavior: 'smooth'
    })
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav)

// Set sections as active
document.addEventListener('scroll', updateActive)

window.addEventListener('resize', recalc)
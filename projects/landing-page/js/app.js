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
let sections = [];
let navHeight;

const options = {
    rootMargin: '0px',
    threshold: 0.55
}

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Construct the sections array to reduce requerying
function findSections() {
    document.querySelectorAll('section').forEach((section) => {
        sections.push({
            element: section,
            nav: section.getAttribute('data-nav'),
            id: section.getAttribute('id')
        });

        // Add to observer
        observer.observe(section)
    });
}

function setActive(e) {
    // find the section for element e
    i = sections.findIndex(section => section.id == e.id);
    let applyFunc;

    sections.forEach(section => {
        if (section.id == e.id) {
            applyFunc = DOMTokenList.prototype.add
        } else {
            applyFunc = DOMTokenList.prototype.remove
        }

        applyFunc.call(section.element.classList, 'your-active-class');
        applyFunc.call(section.navElement.classList, 'active');
    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    // init
    const navNode = document.getElementById('navbar__list');

    // find the sections for navigation
    findSections();

    // update the nav list
    navNode.hidden = true;
    sections.forEach((section) => {
        const newItem = document.createElement('li');

        // set up newItem
        newItem.classList.add('menu__link');
        newItem.textContent = section.nav;
        newItem.setAttribute('data-nav', section.id);
        newItem.addEventListener('click', scrollToAnchor);

        // add newItem to dictionary for reference
        section['navElement'] = newItem;

        // append to menu
        navNode.appendChild(newItem);
    });
    navNode.hidden = false;

    // Navigation height never changes
    navHeight = navNode.getBoundingClientRect().height;
}


function updateActive(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActive(entry.target);
        }
    })
}


// Scroll to anchor ID using scrollTO event
function scrollToAnchor(event) {
    const element = document.getElementById(event.target.getAttribute('data-nav'));
    const top = element.getBoundingClientRect().top;
    const height = navHeight;
    const yOffset = window.pageYOffset;

    window.scrollTo({
        top: top - height + yOffset,
        behavior: 'smooth'
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);

// Create observer to listen for when sections become active
const observer = new IntersectionObserver(updateActive, options)
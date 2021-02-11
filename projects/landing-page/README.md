# Landing Page Project

## Table of Contents

* [Page Structure](#page-structure)
* [Style](#style)
* [Javascript](#javascript)

## Page Structure
This project is structured using straightforward and meaningful tags such as `<header>` and `<main>`. Within the `<body>` tag, there is a `<header>` that contains the navigation bar, as well as a `<main>` and `<footer>`. Within the `<main>` portion of the site, there are several sections designated with the fitting `<section>` tag. 

Each `<section>` must have an `id` property, though the particular value of this is not important. Each `<section>` also has the attribute `data-nav` that correlates to its label in the navigation menu. Neither of these values have an effect on the functionality of the site, only that they exist.

It is good to note that this site utilizes BEM naming conventions.

## Style
Each menu item receives the class `active` when its section is currently within the viewport. The sections also receive the class `your-active-class` when they are within the viewport to enable the "bubbles". 

## Javascript
The javascript contained in this project consists of four event listeners and the associated helper functions. These are as follows:

### [document.DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
When the DOM content is finished loading, we build our navigation. The reason we wait for this step to be complete is because in order to construct it, we need to be able to parse the DOM for `<section>` tags!

### [window.load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event)
When the window is finished loading, we run the `main()` function. This initializes the page and which sections are active.

### [window.scroll](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)
When the window is scrolled, we need to check to see if the active sction has changed. This is terribly inefficient, and if I had more time I would absolutely optimize this because it utilizes a lot of the processing during runtime.

### [window.resize](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)
When the window is resized, we have to recalculate the breakpoints! This is because the height of the sections changes, so we have to look for different breakpoints. By precalculating the breakpoints, the scroll function doesn't have to do the work of calculating them every time!

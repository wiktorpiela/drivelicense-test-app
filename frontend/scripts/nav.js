let navBurger = document.getElementsByClassName('nav-burger')[0];
let navBurgerIcon = document.getElementsByName('menu-outline')[0];
let mainNav = document.getElementsByClassName('main-nav')[0];
navBurger.addEventListener('click', function(){
    if (window.getComputedStyle(mainNav,null).display === "none") {
        mainNav.style.display = "flex";
        mainNav.style.flexDirection = "column";
        mainNav.style.marginLeft = "5rem";
        navBurgerIcon.setAttribute("name","close-outline")
    } else {
        mainNav.style.display = "none"
        navBurgerIcon.setAttribute("name","menu-outline")
    }
})
let navBurgers = Array.prototype.slice.call(document.getElementsByClassName('nav-burger'));
let navBurgerIcons = document.getElementsByName('menu-outline');
let mainNavs = document.getElementsByClassName('main-nav');

for (let i = 0; i < navBurgers.length; i++) {

    let mainNav = mainNavs[i];
    let navBurgerIcon = navBurgerIcons[i];

    navBurgers[i].addEventListener('click', function () {
        if (window.getComputedStyle(mainNav, null).display === "none") {
            mainNav.style.display = "flex";
            mainNav.style.flexDirection = "column";
            mainNav.style.marginLeft = "5rem";
            navBurgerIcon.setAttribute("name", "close-outline")
        } else {
            mainNav.style.display = "none"
            navBurgerIcon.setAttribute("name", "menu-outline")
        }
    })


}
// navBurgers.forEach((navBurger) => {

//     console.log(navBurger)
//     navBurger.addEventListener('click', function () {
//         if (window.getComputedStyle(mainNav, null).display === "none") {
//             mainNav.style.display = "flex";
//             mainNav.style.flexDirection = "column";
//             mainNav.style.marginLeft = "5rem";
//             navBurgerIcon.setAttribute("name", "close-outline")
//         } else {
//             mainNav.style.display = "none"
//             navBurgerIcon.setAttribute("name", "menu-outline")
//         }
//     })

// })


const nav= document.querySelector(".primary-navigation"); //storing the <nav> in nav variable
const navToggle= document.querySelector(".mobile-nav-toggle") //storing button class in navToggle

// when someone clicks the hamburger button
navToggle.addEventListener("click" ,() =>{
    const visibility= nav.getAttribute("data-visible");

    // if the nav is closed, open it
    if (visibility==="false"){
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded",true); /* To change hamburger icon to close icon*/
    }
    else{
        // if the nav is open, close it
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
    // console.log(visibility);

})



<<<<<<< HEAD
const hamburger = document.getElementById("hamburgera");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
    navbar.className = navbar.className === "nav" ? "responsive" : "nav";
});

window.addEventListener("resize", () => {
    if(window.innerWidth >= 1540) {
        navbar.className = "nav";
    }
=======
const hamburger = document.getElementById("hamburgera");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
    navbar.className = navbar.className === "nav" ? "responsive" : "nav";
});

window.addEventListener("resize", () => {
    if(screen.orientation === "landscape-primary" || screen.orientation === "landscape-secondary") {
        navbar.className = "nav";
    }
>>>>>>> e57da25684577ec5763d4980ebeeb7421bffc0f4
});
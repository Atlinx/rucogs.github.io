const hamburger = document.getElementById("hamburgera");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
    navbar.className = navbar.className === "nav" ? "responsive" : "nav";
});

window.addEventListener("resize", () => {
    if(window.innerWidth >= 1540) {
        navbar.className = "nav";
    }
});
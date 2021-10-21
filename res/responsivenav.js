const hamburger = document.getElementById("hamburgera");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
    navbar.className = navbar.className === "nav" ? "responsive" : "nav";
});

window.addEventListener("resize", () => {
    if(screen.orientation === "landscape-primary" || screen.orientation === "landscape-secondary") {
        navbar.className = "nav";
    }
});
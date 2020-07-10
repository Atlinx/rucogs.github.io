const parallaxDiv = document.getElementsByClassName("parallax");
const imgHeightDiv2 = 1050;
var parallaxMod = 0.4;

window.addEventListener("scroll", () => {
    let trueOffset = window.pageYOffset;
    for(var i = 0; i < parallaxDiv.length; i++) {
        parallaxDiv[i].style.backgroundPositionY = trueOffset * parallaxMod + imgHeightDiv2 + "px";
    }
});


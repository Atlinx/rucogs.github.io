const parallaxDiv = document.getElementsByClassName("parallax");
const imgHeight = 2000;
const imgHeightPercOffset = 10;
const imgHeightDiv2 = 1000;
var parallaxMod = 0.1;

window.addEventListener("scroll", () => {
    let trueOffset = window.pageYOffset;
    for(var i = 0; i < parallaxDiv.length; i++) {
        //parallaxDiv[i].style.backgroundPositionY = trueOffset * parallaxMod + imgHeightDiv2 + "px";
        parallaxDiv[i].style.backgroundPositionY = trueOffset * parallaxMod + imgHeightPercOffset + "%";
    }
});


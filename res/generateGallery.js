const numImages = 30;

generateGallery();

function generateGallery() {
    var gallery = document.getElementById("gallery");
    for(var i = 1; i <= numImages; i++) {
        var newPhoto = document.createElement("div");
        newPhoto.setAttribute("class", "photo");
        var imgLink = document.createElement("a");
        imgLink.setAttribute("target", "_blank");
        imgLink.setAttribute("href", "res/img/gallery/" + i + ".png");
        var img = document.createElement("img");
        img.setAttribute("src", "res/img/gallery/" + i + ".png");
		img.setAttribute("height", 200);
        imgLink.appendChild(img);
        newPhoto.appendChild(imgLink);
        gallery.appendChild(newPhoto);
    }
}

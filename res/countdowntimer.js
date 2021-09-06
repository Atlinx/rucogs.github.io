var finalDate = new Date("Nov 9, 2021 19:00:00").getTime();

var y = () => {
    var now = new Date().getTime();
    var delta = finalDate - now;

    var days = Math.floor(delta / (1000 * 60 * 60 * 24));
    var hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((delta % (1000 * 60)) / 1000);

    document.getElementById("countdowntimer").innerHTML = "" + pad(days) + "d : " + pad(hours) + "h : " + pad(minutes) + "m : " + pad(seconds) + "s";

    if(delta < 0) {
        clearInterval(x);
        document.getElementById("countdowntimer").innerHTML = "🎉 : 🎉 : 🎉 : 🎉";
    }
}

var x = setInterval(y, 1000);

y();

function pad(a){
    return("0" + a).slice(-2);
}
help = document.getElementById("help");
qucikWrapper = document.getElementById("quick-wrapper");
searchForm = document.getElementById("search-form");

helpHTML = help.innerHTML;
wrapperHTML = qucikWrapper.innerHTML;

var shrink = () => {
    // help.innerHTML = "";
    // qucikWrapper.innerHTML = "";
    searchForm.style.width = "60%";
    help.innerHTML = '[<span class="bold">/d</span>];[<span class="bold">/g</span>];[<span class="bold">r/</span>];<br>[<span class="bold">/z</span>];[<span class="bold">/zf</span>];[<span class="bold">/zg</span>];<br>[<span class="bold">/t</span>];[<span class="bold">/s</span>];[<span class="bold">/y</span>];[<span class="bold">/yt</span>];';
}

var unshrink = () => {
    searchForm.style.width = "40%";
    help.innerHTML = helpHTML;
    qucikWrapper.innerHTML = wrapperHTML;
}

//FOR PC
if (window.matchMedia("(orientation: portrait)").matches) {
    // you're in PORTRAIT mode
    shrink();
}

if (window.matchMedia("(orientation: landscape)").matches) {
    // you're in LANDSCAPE mode
    unshrink();
}

//FOR MOBILE
// Listen for orientation changes
window.addEventListener("orientationchange", function () {
    // Announce the new orientation number
    if (window.orientation % 180 == 0) {
        shrink();
    } else {
        unshrink();
    }
}, false);
help = document.getElementById("help");
qucikWrapper = document.getElementById("quick-wrapper");

helpHTML = help.innerHTML;
wrapperHTML = qucikWrapper.innerHTML;

function shrink() {
    // help.innerHTML = "";
    // qucikWrapper.innerHTML = "";
    help.innerHTML = '[<span class="bold">/d</span>];[<span class="bold">/g</span>];[<span class="bold">r/</span>];[<span class="bold">/z</span>];[<span class="bold">/zf</span>];[<span class="bold">/zg</span>];[<span class="bold">/t</span>]';
}

function writeHelp() {
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
    writeHelp();
}

//FOR MOBILE
// Listen for orientation changes
window.addEventListener("orientationchange", function () {
    // Announce the new orientation number
    if (window.orientation % 180 == 0) {
        shrink();
    } else {
        writeHelp();
    }
}, false);
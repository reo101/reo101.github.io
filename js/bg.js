// background.onclick = () => {document.getElementById("search").focus()};

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
// var japanese = "ノ国需ロヱ楽発ノエロレ階革広事ト受2断か裁回みす況載む型発ヒ族同ちフわ府下ゅぞ";
var japanese = "あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわゐゑを";
//converting the string into an array of single characters
chinese = chinese.split("");
japanese = japanese.split("");

var draw = () => {
    if (isRainbow)
        color = randomizeColor();
    if (animationRunning) {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, background.width, background.height);

        ctx.font = font_size + "px arial";

        ctx.fillStyle = color; //green text

        //looping over drops

        for (var i = 0; i < drops.length; i++) {
            //a random japanese character to print
            var text = japanese[Math.floor(Math.random() * japanese.length)];
            //x = i*font_size, y = value of drops[i]*font_size

            if (isBetterRainbow)
                color = randomizeColor();
                ctx.fillStyle = color;
            ctx.fillText(text, i % columns * font_size, drops[i] * font_size);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if (drops[i] * font_size > background.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }
    }

    window.setTimeout(draw, delay);
}

draw();
// setInterval(draw, delay);
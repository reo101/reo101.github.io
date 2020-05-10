var draw = () => {
    if (isRainbow)
        color = randomizeColor();
    if (animationRunning) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, background.width, background.height);

        ctx.font = font_size + "px arial";

        ctx.fillStyle = color;

        for (var i = 0; i < drops.length; i++) {
            var text = array[Math.floor(Math.random() * array.length)];

            if (isBetterRainbow)
                color = randomizeColor();
                ctx.fillStyle = color;
            ctx.fillText(text, i % columns * font_size, drops[i] * font_size);

            if (drops[i] * font_size > background.height && Math.random() > 0.975)
                drops[i] = 0;

            drops[i]++;
        }
    }

    window.setTimeout(draw, delay);
}

draw();
// setInterval(draw, delay);
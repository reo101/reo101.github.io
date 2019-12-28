var browserPrefix = "pomiq";

navigator.sayswho = (() => {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    M = M[0];
    if (M == "Chrome") { browserPrefix = "webkit"; }
    if (M == "Firefox") { browserPrefix = "moz"; }
    if (M == "Safari") { browserPrefix = "webkit"; }
    if (M == "MSIE") { browserPrefix = "ms"; }
})();

// var WE_visualizer = browserPrefix=="pomiq" ? null : (function ($, createjs) {

  // Scope defintion to empty object
    var _ = {};

    var transitionAudioData = [];
    var newAudioData = [];

    var stage;

   // Initializer function
    var init = function() {
        _.setCanvasSize();

        // Create stage for the canvas with ID '#canvas'
        stage = new createjs.Stage("visualizer");

        // Performance
        stage.snapToPixel = true;
        stage.snapToPixelEnabled = true;
        
        _.bind();

        // Every 'tick' is the is a 'Frame per Second'
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", _.draw);
    }

    // Bind events to the visualizer
    _.bind = function() {
        if (window.wallpaperRegisterAudioListener) {

            window.wallpaperRegisterAudioListener(function(data) {

                // data is an array with 128 floats
                newAudioData = correctWithPinkNoiseResults(data);

                if (transitionAudioData.length == newAudioData.length) {

                    // Transition fadedSoundData to 
                    createjs.Tween.get(transitionAudioData, {
                        override: true
                    }).to(newAudioData, 50);

                } else {
                    transitionAudioData = newAudioData;
                }
            });
        } else {
            setInterval(function() {
                transitionAudioData = [];
                for (x = 0; x < 128; x++) {
                    transitionAudioData.push(Math.random() * 1);
                }
            }, 75);
        }
    }

    // Apply Pink Noise correction to the audio data supplied by Wallpaper Engine
    function correctWithPinkNoiseResults(data) {

        var pinkNoise = [1.1760367470305, 0.85207379418243, 0.68842437227852, 0.63767902570829, 0.5452348949654, 0.50723325864167, 0.4677726234682, 0.44204182748767, 0.41956517802157, 0.41517375040002, 0.41312118577934, 0.40618363960446, 0.39913707474975, 0.38207008614508, 0.38329789106488, 0.37472136606245, 0.36586428412968, 0.37603017335105, 0.39762590761573, 0.39391828858591, 0.37930603769622, 0.39433365764563, 0.38511504613859, 0.39082579241834, 0.3811852720504, 0.40231453727161, 0.40244151133175, 0.39965366884521, 0.39761103827545, 0.51136400422212, 0.66151212038954, 0.66312205226679, 0.7416276690995, 0.74614971301133, 0.84797007577483, 0.8573583910469, 0.96382997811663, 0.99819377577185, 1.0628692615814, 1.1059083969751, 1.1819808497335, 1.257092297208, 1.3226521464753, 1.3735992532905, 1.4953223705889, 1.5310064942373, 1.6193923584808, 1.7094805527135, 1.7706604552218, 1.8491987941428, 1.9238418849406, 2.0141596921333, 2.0786429508827, 2.1575522518646, 2.2196355526005, 2.2660112509705, 2.320762171749, 2.3574848254513, 2.3986127976537, 2.4043566176474, 2.4280476777842, 2.3917477397336, 2.4032522546622, 2.3614180150678];

        for (var i = 0; i < 64; i++) {
            data[i + 0] /= pinkNoise[i + 0];  // Had to do i + 0, because [ i ] gets escaped in post :P
            data[i + 64] /= pinkNoise[i + 0];  // Had to do i + 0, because [ i ] gets escaped in post :P
        }
        return data;
    }

    _.draw = function() {

        // Clear Stage
        stage.removeAllChildren();
    
        var spacing = 10; // spacing between lines in pixels
        var lineWidth = 3; // width of lines in pixels
        var lineHeightMultiplier = 200; // multiplier for length * audioValue to pixels
        var color = "red"; // newColor string ( rgba(255,0,0,1), #FF0000, red )
    
        var totalWidth = transitionAudioData.length * spacing - spacing;
        var offsetX = (stage.canvas.width - totalWidth) / 2;
        var offsetY = stage.canvas.height / 2;
    
        // We will loop through all values of the transition audio data and create a line for it
        for (var x = 0; x < transitionAudioData.length; x++) {
    
            // Get audio value from the data set for current position
            var audioValue = transitionAudioData[x];
    
            // Multiply the value in the audio data set with the height multiplier. 
            var lineHeight = audioValue * lineHeightMultiplier;
    
            // Create a new line-shape object
            var line = new createjs.Shape();
    
            // Set the width of the line, and the caps to 'round'
            line.graphics.setStrokeStyle(lineWidth, "round")
    
            // Set the newColor of the line to 'red'
            line.graphics.beginStroke(color);
    
            // Draw the line from {x,y}, to {x,y}
            line.graphics.moveTo(x * spacing + offsetX, -lineHeight + offsetY);
            line.graphics.lineTo(x * spacing + offsetX, lineHeight + offsetY);
    
            // Add the line to the stage
            stage.addChild(line);
        }
    
        // Update the stage ( this is the actual drawing method )
        stage.update();
    }

    // $(document).ready(function () {
    //     // Initializer WE Visualizer
    //     init();
    // });

    _.setCanvasSize = function () {
        // Set canvas width and height attributes to screen resolution
        // $("#visualizer").attr({
        //     width: $(document).width(),
        //     height: $(document).height() * 0.3,
        //     background: "red"
        // });
        // document.getElementById("visualizer").style.width = document.width;
        // document.getElementById("visualizer").style.height = document.height;
        // document.getElementById("visualizer").style.background = "none";
    }

// })(jQuery, createjs);

// unneeded onload
init();
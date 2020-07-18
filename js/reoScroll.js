function makeDummyStyle(idName, id, animName, timeOffset){
    return `
        #${idName}${id} {
            -webkit-transform: skewX(-12deg);
            transform: skewX(-12deg);
            padding-left: 6px;
            opacity: 0;
            -webkit-animation: ${animName} 1s ease-in-out ${timeOffset}s forwards;
                    animation: ${animName} 1s ease-in-out ${timeOffset}s forwards;
            -webkit-animation-iteration-count: 1;
                    animation-iteration-count: 1;
        }
    `;
    //${Math.floor(id/10)}.${id%10}s
}

var animatedElements = [];

function textToAnimation(text="test", divId="div", animIdName="anim", styleIdName="anim", animationName="whoosh", inChars=true, appendStyles=false, appendDiv=false, parentDivId) {
    let div = document.createElement("DIV");
    div.id=divId;
    var pieces = [];
    // console.log(text);
    // console.log(text.replace(/\\n/g, "\n").split("\n"));
    text = text.replace(/\\n/g, "\n");
    
    for(let i=0, rows = text.split("\n"), row;  i<rows.length; i++){
        row = rows[i];
        // console.log(row);
        pieces.push(inChars?[...row]:row.split(" ").map(str => str+" "));
    }

    // console.log(pieces);

    // let pieces = inChars?[...text]:text.split(" ").map(str => str+" ");

    let globalStyle = document.createElement("STYLE");
    let stylesArray = [];

    for(let row=0, i=0, offset=1; row<pieces.length; row++){
        for(let j=0, tempSpan; j<pieces[row].length; j++){
            tempSpan = document.createElement("SPAN");
            tempSpan.appendChild(document.createTextNode(pieces[row][j]));
            tempSpan.id=animIdName+(++i);
            tempSpan.style.webkitAnimationPlayState = "paused";
            tempSpan.style.animationPlayState = "paused";
            div.appendChild(tempSpan);
            stylesArray.push(makeDummyStyle(animIdName, i, animationName, (offset++)/10));
        }
        if(row<pieces.length-1){
            div.appendChild(document.createElement("BR"));
        }
    }

    globalStyle.appendChild(document.createTextNode(stylesArray.join("")));
    globalStyle.id = styleIdName;
    
    if(appendStyles)
        document.head.appendChild(globalStyle);

    if(appendDiv)
        document.getElementById(parentDivId).appendChild(div);

    var data = {
        "div": div,
        "style": globalStyle
    };

    animatedElements.push(data);

    return data;
}

function startAnimation(elem) {
    elem.childNodes.forEach(span => span.style="animation-play-state: running;");
}

function clearAllAnimatedText() {
    for(let i=0; i < animatedElements.length; i++){
        document.getElementById(animatedElements[i].style.id).remove();
        animatedElements[i].div.remove();
    }
    animatedElements = [];
}
////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
}

function check(elem) {
    if(!elem.seen && isVisible(elem)){
        startAnimation(elem);
        elem.seen = true;
    }
}

function checkAllAnimatedText() {
    animatedElements.forEach(data => check(data.div));
}

window.onscroll = checkAllAnimatedText;
////////////////////////////////////////////////////////////

let message = `
Stop! You violated the law. Pay the court a fine or
serve your sentence. Your stolen goods are
now forfeit.
- Skingrad Guard 
`;

let animatedText = textToAnimation(message, "AnimationTextDiv", "fadeInAnimation", "animStyles1", "whoosh", true, true, true, "testbed");

////////////////////////////////////////////////////////////
checkAllAnimatedText();
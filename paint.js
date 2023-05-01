let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
let colours = []; //empty for now
let currentColour = document.getElementById("colour");



const paint = { //object literal
    currentX: undefined,
    currentY: undefined,
    lineSize: 1,
    drawingOn: false
};




canvas.onmousedown = clicky; //when clicking lmb down
canvas.onmouseup = noclicky; //when releasing lmb
canvas.onmousemove = draw; //when click+drag lmb ON THE CANVAS

document.addEventListener("keydown", function (event) { //just to prevent the stupid page scrolling, refer to https://stackoverflow.com/questions/30219766/disable-arrow-key-page-scrolling-in-firefox
    if (event.key == "ArrowUp") {
        event.preventDefault();
    }
    if (event.key == "ArrowDown") {
        event.preventDefault();
    }
})

document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowUp") {
        event.preventDefault();
        paint.lineSize += 1;
        console.log(paint.lineSize);
    }
    if (event.key == "ArrowDown") {
        event.preventDefault();
        paint.lineSize -= 1;
        console.log(paint.lineSize);
    }
})

//actual drawing function
function draw(event) {
    if (paint.drawingOn == true) {
        c.fillStyle = currentColour.value;
        c.strokeStyle = currentColour.value;
        c.lineWidth = paint.lineSize;
        c.beginPath();
        if ((paint.currentX == undefined) || (paint.currentY == undefined)) {
            c.moveTo(event.offsetX, event.offsetY);
        }
        else {
            c.moveTo(paint.currentX, paint.currentY);
            c.lineTo(event.offsetX, event.offsetY);
        }
        //c.arc(event.offsetX, event.offsetY, paint.lineSize, 0, toRadians(360));
        c.fill();
        c.stroke();
        paint.currentX = event.offsetX;
        paint.currentY = event.offsetY;
    }
}

function toRadians(degrees) {
    return (degrees * (Math.PI / 180));
}

function clicky() {
    paint.drawingOn = true;
    prevX = null;
    prevY = null;
    console.log(drawingOn + "drawing now");
}

function noclicky() {
    paint.drawingOn = false;
    paint.currentX = undefined;
    paint.currentY = undefined;
    console.log(drawingOn + "turning drawing off");
}

function clearCanvas() {
    c.clearRect(0, 0, 500, 500);
    c.beginPath();
}

document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case "r":
            event.preventDefault;
            clearCanvas();
            break;
        case "e":
            event.preventDefault;
            emptyArray();
            break;
    }
})

document.getElementById("remember").onclick = storeColour;


//adding a new colour to the end of the array
function storeColour() {
    colours.push(currentColour.value);
    console.log(colours);
    document.getElementById("list").innerHTML = "Colour list: ";
    let temp = "";

    //making the list of colours more intuitive for user
    for (let i = 0; i < colours.length; i++) {
        temp += colours[i];
        console.log(temp);
        document.getElementById("list").innerHTML += "<span id=" + "\"" + temp + "\"" + ">" + temp + "</span>"; //put each colour of the array in a <span> 
        document.getElementById("" + temp + "").style.color = temp; //set color of that span to the current array item
        temp = ""; //reset temp
    }
}

//gets rid of all the 
function emptyArray() {
    colours.splice(0, colours.length); //this should empty the array
    document.getElementById("list").innerHTML = "Colour list: No colours stored!";
    console.log(colours);
}

let currentArrayPosition;
let colourCycle;
let intervalRun = false;

//to actually avatar cycle the colours
function cycleColoursTime() {
    console.log("cycling");
    c.beginPath();
    c.fillStyle = colours[currentArrayPosition];
    console.log("currently, array is at " + currentArrayPosition);
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (currentArrayPosition == 0) { //if its alrdy at the first colour in the array go back to the last
        currentArrayPosition = (colours.length - 1);
    }
    else {
        currentArrayPosition--;
    }
}

//to start the avatar cycle
document.getElementById("cycle").onclick = function () {
    currentArrayPosition = (colours.length - 1); //FOR SOME REASON THIS WORKS IF I DEFINE IT HERE AND NOT OUTSIDE
    if (intervalRun == false) {
        colourCycle = setInterval(cycleColoursTime, 2000);
        intervalRun = true;
    }
}

//to stop the avatar cycle
document.getElementById("stop").onclick = function () {
    clearInterval(colourCycle);
    intervalRun = false;
}
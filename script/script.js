//selectors
const container = document.querySelector("#container");
const dimButton = document.querySelector("#dim-button");
const clearButton = document.querySelector("#clear");
const eraseButton = document.querySelector("#erase");
const randButton = document.querySelector("#random-color");
const colorText = document.querySelector('#num-text')
const dimText = document.querySelector("#dim-text");

//create default elements used in grid creation
const flexLine = document.createElement('div');
flexLine.classList.add('line');
const divSquare = document.createElement('div');
divSquare.classList.add('square');

let currentLines = dimText.value;
let color = "#000000";
let previousColor = "#000000";
let erase = false;
let rand = false;

drawGrid(currentLines);

dimButton.addEventListener('click', updateGrid);
clearButton.addEventListener('click', clearGrid);
eraseButton.addEventListener('click', toggleErase);
randButton.addEventListener('click', toggleRandom);
colorText.addEventListener('change', setCustomColor);


function updateGrid() {
    clearGridDim();
    drawGrid();
}

//function used to draw grid, utilizing predefined line and square elements.
function drawGrid() {
    currentLines = dimText.value;

    if (currentLines.match(/^[0-9]+$/) === null) {
        dimText.setAttribute('style', 'border-bottom-color: red;');
        return;
    }  
    currentLines = parseInt(currentLines);

    if (currentLines <= 0) {
        dimText.setAttribute('style', 'border-bottom-color: red;');
        return;
    } else if (currentLines > 100) {
        currentLines = 100;
    };

    dimText.setAttribute('style', 'border-bottom-color: #f7d0cb;');
    for (let i = 0; i < currentLines; i++) { 
        let newLine = flexLine.cloneNode(true) 
        for (let j = 0; j < currentLines; j++){
            let newSquare = divSquare.cloneNode(true);
            preventDrag(newSquare);
            addDrawer(newSquare);
            newLine.appendChild(newSquare);
        }
        container.appendChild(newLine);
    } 
}

//toggle randomness
function toggleRandom() {
    if (erase) {
        toggleErase();
    }

    if (!rand) {
        rand = true;
        previousColor = color;
        randButton.setAttribute('style', 'background-color: #000000; color: #FFDFC6;');
    } else {
        rand = false;
        color = previousColor;
        randButton.setAttribute('style', 'background-color: #FFDFC6; color: #000000;');
    }
}

function generateRandomColor() {
    colorString = "#";
    for (let i = 0; i < 3; i++) {
        check = Math.floor(Math.random() * 256).toString(16);

        if (check.length === 1) {
            check = "0" + check;
        }

        colorString += check;
    }

    return colorString;
}

//set erase properties
function toggleErase() {
    if (rand) {
        toggleRandom();
    }

    if (!erase) {
        erase = true;
        previousColor = color;
        color = '#ffffff';
        eraseButton.setAttribute('style', 'background-color: #000000; color: #FFDFC6;');
    } else {
        erase = false;
        color = previousColor;
        eraseButton.setAttribute('style', 'background-color: #FFDFC6; color: #000000;');
    }
}

function setCustomColor() {
    if (this.value.match(/^#[A-Fa-f0-9]{6}$/) === null) {
        this.setAttribute('style', 'border-bottom-color: red;');
        return;
    } else {
        color = this.value;
        this.setAttribute('style', 'border-bottom-color: #f7d0cb;');
    }
}

//clear the grid dimensions to draw a new one
function clearGridDim() {
    const currentGridLines = document.querySelectorAll(".line");
    currentGridLines.forEach(line => line.remove());
}

//clear the grid from drawings
function clearGrid() {
    const currentSquares = document.querySelectorAll(".square");
    currentSquares.forEach(square => square.setAttribute("style", `background-color: #ffffff`));
}

//prevents divs from being dragged
function preventDrag(element) {
    element.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
}

//fill the chosen div with specific color
function fillDiv(element, color = '#000000') {
    element.setAttribute("style", `background-color: ${color}`);
}

//add functionality to allow mouse cursor to fill divs if when cursor is entering if left mouse button is pushed
function addDrawer(element) {
    element.addEventListener("mousedown", (e) => {
        fillDiv(e.currentTarget, color);
    });

    element.addEventListener("mouseenter", (e) => {
        if (rand) {
            color = generateRandomColor();
        }

        if (e.buttons === 1) {
            fillDiv(e.currentTarget, color);
        } 
    });
}
//selectors
const container = document.querySelector("#container");
const dimButton = document.querySelector("#dim-button");
const dimText = document.querySelector("#dim-text");

//create default elements used in grid creation
const flexLine = document.createElement('div');
flexLine.classList.add('line');
const divSquare = document.createElement('div');
divSquare.classList.add('square')

let currentLines = dimText.value;

drawGrid(currentLines);

dimButton.addEventListener('click', updateGrid)

function updateGrid() {
    clearGridDim()
    drawGrid()
}

//function used to draw grid, utilizing predefined line and square elements.
function drawGrid() {
    currentLines = dimText.value;

    if (currentLines.match(/^[0-9]+$/) === null) {
        dimText.setAttribute('style', 'border-bottom-color: red;')
        return;
    }  
    currentLines = parseInt(currentLines);

    if (currentLines <= 0) {
        dimText.setAttribute('style', 'border-bottom-color: red;')
        return;
    } else if (currentLines > 100) {
        currentLines = 100;
    };

    dimText.setAttribute('style', 'border-bottom-color: #f7d0cb;')
    for (let i = 0; i < currentLines; i++) { 
        let newLine = flexLine.cloneNode(true) 
        for (let j = 0; j < currentLines; j++){
            let newSquare = divSquare.cloneNode(true);
            newLine.appendChild(newSquare);
        }
        container.appendChild(newLine);
    } 
}

//clear the grid dimensions to draw a new one
function clearGridDim() {
    const currentGridLines = document.querySelectorAll(".line");
    console.log(currentGridLines)
    currentGridLines.forEach(line => line.remove())
}

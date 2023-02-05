const container = document.querySelector("#container");
const flexLine = document.createElement('div');
flexLine.classList.add('line');
const divSquare = document.createElement('div');
divSquare.classList.add('square')

for (let i = 0; i < 16; i++){
    let newLine = flexLine.cloneNode(true) 
    for (let j = 0; j < 16; j++){
        let newSquare = divSquare.cloneNode(true);
        newLine.appendChild(newSquare);
    }
    container.appendChild(newLine);
}   
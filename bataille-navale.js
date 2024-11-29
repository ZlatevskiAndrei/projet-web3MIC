"use strict"

let human_boats = [];
let AI_boats = [];

document.addEventListener("DOMContentLoaded", () => {
    const playerGrid = document.getElementById("PlayerGrid")
    const botGrid = document.getElementById("BotGrid")
    const crossImgUrl = './resources/istockphoto-1276735653-612x612.jpg'; 
    for (let i = 0; i < 10; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            let col = document.createElement('td');
            col.setAttribute('id', i.toString() + j.toString());
            row.appendChild(col);
        }
        playerGrid.appendChild(row);
    }
    for (let i = 0; i < 10; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            let col = document.createElement('td');
            col.setAttribute('id', i.toString() + j.toString());
            row.appendChild(col);
        }
        botGrid.appendChild(row);
    }
    playerGrid.addEventListener("click", (event) => {
        if (event.target.tagName === 'TD') {
            if (event.target.style.backgroundImage === `url("${crossImgUrl}")`) event.target.style.backgroundImage = ''; //enleve croix
            else {
                event.target.style.backgroundImage = `url("${crossImgUrl}")`; //ajoute croix
                event.target.style.backgroundSize = 'cover'; 
                event.target.style.backgroundPosition = 'center'; 
            }
        }
    });
});



function boat_placements() { // à tester
    
    let indice = 0;
    let size_list = [5,4,3,3,2];
    let size = size_list[indice]
    for (let i = 0; i < 5; i++) {
        let boat = [];
        while (true) {
            let randomCell = {
                x: getRandomInt(10),
                y: getRandomInt(10)
            };
            let directions = authorizedDirections(randomCell, size);
            if (directions.length === 0) continue;
            let randomDirection = directions[getRandomInt(directions.length)];
            if (!isBoatConflict(human_boats, randomCell, randomDirection, size)) {
                let x = randomCell.x;
                let y = randomCell.y;
                for (let j = 0; j < size; j++) {
                    boat.push({ x, y });
                    x += randomDirection.x;
                    y += randomDirection.y;
                }
                human_boats.push(boat);
                indice++;
                size = size_list[indice];
                break;
            }
        }
    }
    console.log(human_boats);
}

function isBoatConflict(generatedBoats, startingCell, direction, size) {
    if (!generatedBoats.length) return false;
    const isOccupied = (x, y) => generatedBoats.some(boat => boat.x === x && boat.y === y);
    for (let i = 0; i < size; i++) {
        if (isOccupied(startingCell.x, startingCell.y)) return true;
        startingCell.x += direction.x;
        startingCell.y += direction.y;
    }
    return false;
}

function authorizedDirections(startingCell, size) {
    let directions = [];
    if (startingCell.x + size - 1 <= 9) directions.push({ x: 1, y: 0 })
    if (startingCell.y + size - 1 <= 9) directions.push({ x: 0, y: 1 })
    if (startingCell.x - (size - 1) >= 0) directions.push({ x: -1, y: 0 })
    if (startingCell.y - (size - 1) >= 0) directions.push({ x: 0, y: -1 })
    return directions;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function placeAIBoat(boatCoordinates){ //en train de completer
    let indice = 0;
    let size_list = [5,4,3,3,2];
    let size = size_list[indice]
    for (let i=0; i<5; i++){
        boatCoordinates[i].forEach()
            
        });
    }
}

function appearPlacement(){ //faire apparaitre un image sur dans chaque case indiquee

}

boat_placements()


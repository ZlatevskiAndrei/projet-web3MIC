"use strict"

let human_boats = [];
let AI_boats = [];

document.addEventListener("DOMContentLoaded", (event) => {
    const  playerGrid = document.getElementById("PlayerGrid")
    const botGrid=document.getElementById("BotGrid")
    for (let i = 0; i<10;i++){
        let row=document.createElement('TR');
        for ( let j =0; j<10;j++){
            let col = document.createElement('TD');
            col.setAttribute('id',i.toString()+j.toString());
            col.innerText='.'
            row.appendChild(col);
        }
        playerGrid.appendChild(row) ;
    }

});

function boat_placements() {
    for (let i = 0; i < 5; i++) {
        let boat = [];
        let size = 5;
        boat.push();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


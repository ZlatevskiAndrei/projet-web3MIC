"use strict"

import { extractCoordinates } from "./util.js";

export function initGrids() {
    createGrid("PlayerGrid");
    createGrid("BotGrid");
}


export function createGrid(gridId) {
    const playerGrid = document.getElementById(gridId)
    for (let i = 0; i < 10; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            let col = document.createElement('td');
            col.setAttribute('id', gridId + "-" + i.toString() + j.toString());
            row.appendChild(col);
        }
        playerGrid.appendChild(row);
    }
}


export async function clickGridEvents(gridId) {
    const grid = document.getElementById(gridId);
    const crossImgUrl = './resources/istockphoto-1276735653-612x612.jpg';

    return new Promise((resolve) => {
        grid.addEventListener("click", function handleClick(event) {
            if (event.target.tagName === 'TD') {
                toggleCellMark(event.target, crossImgUrl);
                const coordinates = extractCoordinates(event.target.id);
                setTimeout(() => {
                    resolve(coordinates);
                }, 2000);
                grid.removeEventListener("click", handleClick);
            }
        });
    });
}



export function toggleCellMark(cell, imageUrl) {
    if (cell.style.backgroundImage === `url("${imageUrl}")`) {
        cell.style.backgroundImage = '';
    } else {
        cell.style.backgroundImage = `url("${imageUrl}")`;
        cell.style.backgroundSize = 'cover';
        cell.style.backgroundPosition = 'center';
    }
}


export function appendBoats(boats, gridId) {
    boats.forEach(boat => {
        boat.forEach(boatCell => {
            document.getElementById(`${gridId}-${boatCell.x}${boatCell.y}`).style.backgroundColor = "lightblue";
        });
    });
}







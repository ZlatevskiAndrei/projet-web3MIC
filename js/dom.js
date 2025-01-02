"use strict"

import { extractCoordinates } from "./util.js";

const playerBoatImg="./resources/burried_gift.jpg"

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
    return new Promise((resolve) => {
        grid.addEventListener("click", function handleClick(event) {
            if (event.target.tagName === 'TD') {
                const coordinates = extractCoordinates(event.target.id);
                const allCells = grid.getElementsByTagName('td');
                for (let cell of allCells) {
                    cell.style.border = '1px solid rgba(0, 0, 0, 0.2)';
                }
                resolve({ coordinates, target: event.target });
                grid.removeEventListener("click", handleClick);
            }
        });
    });
}


export function toggleCrossMark(cell, imageUrl) {
    if (cell.style.backgroundImage === `url("${imageUrl}")`) {
        cell.style.backgroundImage = '';
    } else {
        cell.style.backgroundImage = `url("${imageUrl}")`;
        cell.style.backgroundSize = 'cover';
        cell.style.backgroundPosition = 'center';
        cell.style.border = '1px solid red';
    }
}

export function toggleDotMark(cell, imageUrl) {
    if (cell.style.backgroundImage === `url("${imageUrl}")`) {
        cell.style.backgroundImage = '';
    } else {
        cell.style.backgroundImage = `url("${imageUrl}")`;
        cell.style.backgroundSize = 'cover';
        cell.style.backgroundPosition = 'center';
        cell.style.backgroundColor = 'gray';
    }
}


export function appendBoats(boats, gridId) {
    boats.forEach(boat => {
        boat.forEach(boatCell => {
            document.getElementById(`${gridId}-${boatCell.x}${boatCell.y}`).style.backgroundImage = playerBoatImg; // a modifier
        });
    });
}

export function appendBoatsIndicators(gridId) {
    const sizes = [5, 4, 3, 3, 2];
    let i = 0;
    while (i < sizes.length) {
        for (let j = 1; j <= sizes[i]; j++) {
            document.getElementById(`${gridId}-${i + 1}${j}`).style.backgroundColor = "red"; // a modifier si vous voulez
        }
        i++;
    }
}

export function showGrid(gridId) {
    const grid = document.getElementById(gridId);
    const allCells = grid.getElementsByTagName('td');
    for (let cell of allCells) {
        cell.style.border = '1px solid rgba(0, 0, 0, 1)';
    }
}

export function toggleRemoveIndicatorBoat(indicatorGridId, index) {
    const cellGroups = [
        [11, 12, 13, 14, 15], 
        [21, 22, 23, 24],    
        [31, 32, 33],        
        [41, 42, 43],         
        [51, 52]              
    ];
    if (index >= 0 && index < cellGroups.length) {
        let cells = cellGroups[index];
        for (let i = cells.length - 1; i >= 0; i--) {
            let tdElement = document.getElementById(`${indicatorGridId}-${cells[i]}`);
            if (tdElement && tdElement.style.backgroundColor === 'red') {
                tdElement.style.backgroundColor = 'white';
                break; 
            }
        }
    }
}

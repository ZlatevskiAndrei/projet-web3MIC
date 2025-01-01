"use strict"
import { getRandomInt, authorizedDirections, isOccupied, isSurrounded, isBoatChosen, botDelay, isBotChosenBoat, getRandomAdjacentCell } from "./util.js";
import { showGrid, clickGridEvents, toggleCrossMark, toggleDotMark, toggleRemoveIndicatorBoat } from "./dom.js";

export let human_boats = [];
export let AI_boats = [];
let human_boats_counter = 17;
let AI_boats_counter = 17;
const playerIndicatorGridId = "indicatorPlayer";
const AI_indicatorGridId = "indicatorAI"
const chosenCells = new Set();
const giftImg = './resources/gift.jpg';
const dotImg = './resources/hole.png';

export function boat_placements(boats) {
    let index = 0;
    const size_list = [5, 4, 3, 3, 2];
    const maxAttempts = 10000;
    while (index < size_list.length) {
        let size = size_list[index];
        let attempt = 0;
        while (attempt < maxAttempts) {
            attempt++;
            let randomCell = {
                x: getRandomInt(10),
                y: getRandomInt(10)
            };
            let directions = authorizedDirections(randomCell, size);
            if (directions.length === 0) continue;
            let randomDirection = directions[getRandomInt(directions.length)];
            let boat = [];
            let x = randomCell.x;
            let y = randomCell.y;
            let validPlacement = true;
            for (let j = 0; j < size; j++) {
                if (isOccupied(boats, x, y) || isSurrounded(boats, x, y)) {
                    validPlacement = false;
                    break;
                }
                boat.push({ x, y });
                x += randomDirection.x;
                y += randomDirection.y;
            }
            if (validPlacement) {
                boats.push(boat);
                index++;
                break;
            }
        }
        if (attempt >= maxAttempts) {
            throw new Error(`Failed to place boat of size ${size} after ${maxAttempts} attempts.`);
        }
    }
}

export async function start_game(playerGrid, botGrid, human_boats, AI_boats) {
    let botChosenCell = {
        x: getRandomInt(10),
        y: getRandomInt(10)
    };
    while (true) {
        let { coordinates: playerClickCoordinates, target: elementClicked } = await clickGridEvents(botGrid);
        processPlayerMove(playerClickCoordinates, elementClicked, AI_boats);
        await botDelay();
        let isCorrectChoice = isBotChosenBoat(human_boats, botChosenCell);
        botChosenCell = processBotMove(playerGrid, human_boats, isCorrectChoice, botChosenCell);
        showGrid("BotGrid");
        if (human_boats_counter === 0) {
            alert("The impostor got away with all the presents, try again and catch him this time !");
            break; // A completer
        }

        if (AI_boats_counter === 0) {
            alert("You win ! Thank you for saving Christmas !");
            break ;
        }
    }
}

function processPlayerMove(playerClickCoordinates, elementClicked, AI_boats) {
    let formattedCoordinates = { x: playerClickCoordinates[0], y: playerClickCoordinates[1] };
    if (isBoatChosen(AI_boats, formattedCoordinates)) {
        let touchedBoatIndex = AI_boats.findIndex(boat => boat.some(cell => cell.x === formattedCoordinates.x && cell.y === formattedCoordinates.y));
        AI_boats = AI_boats.map(boat => boat.filter(cell => !(cell.x === formattedCoordinates.x && cell.y === formattedCoordinates.y)));
        toggleCrossMark(elementClicked, giftImg);
        toggleRemoveIndicatorBoat(AI_indicatorGridId, touchedBoatIndex);
        AI_boats_counter--;
    }
    else toggleDotMark(elementClicked, dotImg);
}

function processBotMove(playerGrid, human_boats, isBotChosenBoat, botChosenCell) {
    let cellDOMInstance = document.getElementById(`${playerGrid}-${botChosenCell.x}${botChosenCell.y}`);
    chosenCells.add(`${botChosenCell.x},${botChosenCell.y}`);
    if (!isBotChosenBoat) {
        toggleDotMark(cellDOMInstance, dotImg);
        let newCell;
        do {
            newCell = { x: getRandomInt(10), y: getRandomInt(10) };
        } while (chosenCells.has(`${newCell.x},${newCell.y}`));
        return newCell;
    }
    let touchedBoatIndex = human_boats.findIndex(boat => boat.some(cell => cell.x === botChosenCell.x && cell.y === botChosenCell.y));
    human_boats = human_boats.map(boat => boat.filter(cell => !(cell.x === botChosenCell.x && cell.y === botChosenCell.y)));
    toggleCrossMark(cellDOMInstance, giftImg);
    toggleRemoveIndicatorBoat(playerIndicatorGridId, touchedBoatIndex);
    human_boats_counter--;
    let newAdjacentCell;
    do {
        newAdjacentCell = getRandomAdjacentCell(botChosenCell);
    } while (chosenCells.has(`${newAdjacentCell.x},${newAdjacentCell.y}`));
    return newAdjacentCell;
}

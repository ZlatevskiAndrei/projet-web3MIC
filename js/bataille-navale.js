"use strict"
import { getRandomInt, authorizedDirections, isBoatConflict, isOccupied, isSurrounded, isBoatChosen, botDelay, isBotChosenBoat, getRandomAdjacentCell } from "./util.js";
import { clickGridEvents, toggleCrossMark, toggleDotMark } from "./dom.js";

export let human_boats = [];
export let AI_boats = [];
const chosenCells = new Set();
const xImg = './resources/iconmonstr-x-mark-thin.png';
const dotImg = './resources/pngimg.com - dot_PNG1.png';

export function boat_placements(boats) { //pour chaque cellule qu'on ajoute, tu teste sur surrounding, si on ne peux pas mettre une celule, on abandone la création de ce bateau.
    let index = 0;
    let size_list = [5, 4, 3, 3, 2];
    let size = size_list[index]
    for (let i = 0; i < 5; i++) {
        let boat = [];
        while (true) {
            let randomCell = { //le bot choisit une case dans la grille
                x: getRandomInt(10),
                y: getRandomInt(10)
            };
            let directions = authorizedDirections(randomCell, size);
            if (directions.length === 0) continue; // on refait le boucle = choisit une autre case de départ pour avoir des authorizedD
            let randomDirection = directions[getRandomInt(directions.length)];
            if (!(isOccupied && isSurrounded)) { //si condition pas satisfait, on genere une nouvelle startingcell car while tjrs true puisque break se trouve dans le if
                let x = randomCell.x;
                let y = randomCell.y;
                for (let j = 0; j < size; j++) { //ici pour chaque addition d'un cellule, on teste avec surrounding et si on ne peux pas on met un break immediatement
                    boat.push({ x, y });
                    x += randomDirection.x;
                    y += randomDirection.y;
                }
                boats.push(boat);
                index++;
                size = size_list[index];
                break; //sort du loop while
            }
        }
    }
}

export async function start_game(playerGrid, botGrid, human_boats, AI_boats) {
    let botChosenCell = {
        x: getRandomInt(10),
        y: getRandomInt(10)
    };
    while (true) {
        if (human_boats.length === 0 || AI_boats.length === 0) break;
        let { coordinates: playerClickCoordinates, target: elementClicked } = await clickGridEvents(botGrid);
        let formattedCoordinates = { x: playerClickCoordinates[0], y: playerClickCoordinates[1] };
        if (isBoatChosen(AI_boats, formattedCoordinates)) {
            AI_boats = AI_boats.map(boat => boat.filter(cell => !(cell.x === formattedCoordinates.x && cell.y === formattedCoordinates.y))).filter(boat => boat.length > 0);
            toggleCrossMark(elementClicked, xImg);
        }
        else toggleDotMark(elementClicked, dotImg);
        await botDelay();
        let isCorrectChoice = isBotChosenBoat(human_boats, botChosenCell);
        botChosenCell = processBotMove(playerGrid, human_boats, isCorrectChoice, botChosenCell);
    }
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
    human_boats = human_boats
        .map(boat => boat.filter(cell => !(cell.x === botChosenCell.x && cell.y === botChosenCell.y)))
        .filter(boat => boat.length > 0);
    toggleCrossMark(cellDOMInstance, xImg);
    let newAdjacentCell;
    do {
        newAdjacentCell = getRandomAdjacentCell(botChosenCell);
    } while (chosenCells.has(`${newAdjacentCell.x},${newAdjacentCell.y}`));
    return newAdjacentCell;
}
////////////////////////////////////////////////////////////
/*ON LAISSE L'ANCIENNE VERSION DE LA FONCTION boat_placements ICI (pour tester le jeu) POUR LE MOMENT TANT QUE LA NOUVELLE N'EST PAS FINI*/
////////////////////////////////////////////////////////////


/*export function boat_placements(boats) {
    let index = 0;
    let size_list = [5, 4, 3, 3, 2];
    let size = size_list[index]
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
            if (!isBoatConflict(boats, randomCell, randomDirection, size)) {
                let x = randomCell.x;
                let y = randomCell.y;
                for (let j = 0; j < size; j++) {
                    boat.push({ x, y });
                    x += randomDirection.x;
                    y += randomDirection.y;
                }
                boats.push(boat);
                index++;
                size = size_list[index];
                break;
            }
        }
    }
}
    */
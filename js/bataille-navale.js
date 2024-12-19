"use strict"
import { getRandomInt, authorizedDirections, isBoatConflict, isOccupied, isSurrounded, isBoatChosen, botDelay, isBotChosenBoat, getRandomAdjacentCell } from "./util.js";
import { clickGridEvents, toggleCrossMark, toggleDotMark } from "./dom.js";

export let human_boats = [];
export let AI_boats = [];

/*export function boat_placements(boats) { //pour chaque cellule qu'on ajoute, tu teste sur surrounding, si on ne peux pas mettre une celule, on abandone la création de ce bateau.
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
}*/

export function boat_placements(boats) {
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

export async function start_game(playerGrid, botGrid, human_boats, AI_boats) {
    let botChosenCell = {
        x: getRandomInt(10),
        y: getRandomInt(10)
    };
    while (true) {
        if (human_boats.length === 0 || AI_boats.length === 0) break;
        let { coordinates: playerClickCoordinates, target: elementClicked } = await clickGridEvents(botGrid);
        let formattedCoordinates = { x: playerClickCoordinates[0], y: playerClickCoordinates[1] };
        console.log(formattedCoordinates);
        console.log(AI_boats);  
        console.log(isBoatChosen(AI_boats, formattedCoordinates));
        if (isBoatChosen(AI_boats, formattedCoordinates)) {
            AI_boats = AI_boats.map(boat => boat.filter(cell => !(cell.x === formattedCoordinates.x && cell.y === formattedCoordinates.y))).filter(boat => boat.length > 0);
            toggleCrossMark(elementClicked);
        }
        else toggleDotMark(elementClicked);
        await botDelay();
        let isBotChosenBoat = isBotChosenBoat(human_boats, botChosenCell);
        botChosenCell = processBotMove(playerGrid, human_boats, isBotChosenBoat, botRandomCell);
    }
}

function processBotMove(playerGrid, human_boats, isBotChosenBoat, botChosenCell) {
    let cellDOMInstance = document.getElementById(`${playerGrid}-${botChosenCell.x}${botChosenCell.y}`);
    if (!isBotChosenBoat) {
        toggleDotMark(cellDOMInstance);
        return {
            x: getRandomInt(10),
            y: getRandomInt(10)
        };
    }
    human_boats = human_boats.map(boat => boat.filter(cell => !(cell.x === botChosenCell.x && cell.y === botChosenCell.y))).filter(boat => boat.length > 0);
    toggleCrossMark(cellDOMInstance);
    return getRandomAdjacentCell(botChosenCell);
}



















/*
       il attends jusqu'a ce que le joueur choche une case(si bonne case on laisse le X, sinon met un petit point),
       faire une simulation comme si il calcule 2 sec et joue sur
       la grille du joueur(si bonne case choisi, on fait pareil, sinon pareil. Juste que la on va faire le bot un peu plus
       intelligent) et puis on fait un continue sur la boucle et on change de turn.
       Le jeu finira le premier qui detruit tous les bateux.
       */
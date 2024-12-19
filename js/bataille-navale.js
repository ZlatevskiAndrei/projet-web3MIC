"use strict"
import { getRandomInt, authorizedDirections, isBoatConflict, isBoatChosen } from "./util.js";
import { clickGridEvents, toggleCrossMark } from "./dom.js";

export let human_boats = [];
export let AI_boats = [];

export function boat_placements(boats) { //pour chaque cellule qu'on ajoute, tu teste sur surrounding, si on ne peux pas mettre une celule, on abandone la création de ce bateau.
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
                for (let j = 0; j < size; j++) { //ici pour chaque addition d'un cellule, on teste avec surrounding et si on ne peux pas on met un break immediatement
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
    while (true) {
        const {playerClickCoordinates, elementClicked} = await clickGridEvents(botGrid);
        playerClickCoordinates = {x: playerClickCoordinates[0], y: playerClickCoordinates[1]};
        if (isBoatChosen(human_boats, playerClickCoordinates)) toggleCrossMark(elementClicked);



        /*
        il attends jusqu'a ce que le joueur choche une case(si bonne case on laisse le X, sinon met un petit point),
        faire une simulation comme si il calcule 2 sec et joue sur
        la grille du joueur(si bonne case choisi, on fait pareil, sinon pareil. Juste que la on va faire le bot un peu plus
        intelligent) et puis on fait un continue sur la boucle et on change de turn.
        Le jeu finira le premier qui detruit tous les bateux.
        */
    }
}




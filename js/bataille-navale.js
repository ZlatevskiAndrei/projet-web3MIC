"use strict"
import { getRandomInt, authorizedDirections, isOccupied, isSurrounded } from "./util.js";
import { clickGridEvents } from "./dom.js";

export let human_boats = [];
export let AI_boats = [];

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

export async function start_game(grid1, grid2) {
    let playerTurn = true;
    while (true) {
        let test = await clickGridEvents(grid2);
        console.log(test[0] + " " + test[1]);
        


        /*
        il attends jusqu'a ce que le joueur choche une case(si bonne case on laisse le X, sinon met un petit point),
        faire une simulation comme si il calcule 2 sec et joue sur
        la grille du joueur(si bonne case choisi, on fait pareil, sinon pareil. Juste que la on va faire le bot un peu plus
        intelligent) et puis on fait un continue sur la boucle et on change de turn.
        Le jeu finira le premier qui detruit tous les bateux.
        */
    }
}




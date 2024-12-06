"use strict"
import { getRandomInt, authorizedDirections, isBoatConflict } from "./util.js";


export let human_boats = [];
export let AI_boats = [];

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

export async function start_game(grid1, grid2) {
    let playerTurn = true;
    while (true) {

    }
}




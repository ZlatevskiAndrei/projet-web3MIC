"use strict"

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/*export function isBoatConflict(generatedBoats, startingCell, direction, size) { //suppression de cette fonction, garder que isSurrounded et isOccupied.
    if (!generatedBoats.length) return false;
    const isOccupied = (x, y) => generatedBoats.some(boat => boat.some(cell => cell.x === x && cell.y === y));
    const isSurrounded = (x, y) => isOccupied(x + 1, y) || isOccupied(x, y + 1) || isOccupied(x - 1, y) || isOccupied(x, y - 1)
    let x = startingCell.x;
    let y = startingCell.y;
    for (let i = 0; i < size; i++) {
        if (isOccupied(x, y) && isSurrounded(x, y)) return true;
        x += direction.x;
        y += direction.y;
    }
    return false;
}*/

export function authorizedDirections(startingCell, size) {
    let directions = [];
    if (startingCell.x + size - 1 <= 9) directions.push({ x: 1, y: 0 })
    if (startingCell.y + size - 1 <= 9) directions.push({ x: 0, y: 1 })
    if (startingCell.x - (size - 1) >= 0) directions.push({ x: -1, y: 0 })
    if (startingCell.y - (size - 1) >= 0) directions.push({ x: 0, y: -1 })
    return directions;
}

export function extractCoordinates(cellId) {
    const match = cellId.match(/-(\d)(\d)$/);
    if (match) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        return [x, y];
    } else throw new Error;
}

export function isBoatChosen(boat_list, coordinates) {
    return isOccupied(boat_list, coordinates.x, coordinates.y)
}
export function isOccupied(generatedBoats, x, y) {
    return generatedBoats.some(boat => boat.some(cell => cell.x === x && cell.y === y));
}

export function isSurrounded(generatedBoats,x, y) {
    return isOccupied(generatedBoats,x + 1, y) || isOccupied(generatedBoats,x, y + 1) || isOccupied(generatedBoats,x - 1, y) || isOccupied(generatedBoats,x, y - 1)
}

export async function botDelay(duration = 2000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export function isBotChosenBoat(boat_list, randomCell) {
    return isOccupied(boat_list, randomCell.x, randomCell.y);
}

export function getRandomAdjacentCell(cell) {
    const { x, y } = cell;
    const directions = [
        { x: x - 1, y }, 
        { x: x + 1, y }, 
        { x, y: y - 1 }, 
        { x, y: y + 1 }, 
    ];
    const validCells = directions.filter(({ x, y }) => x >= 0 && x <= 9 && y >= 0 && y <= 9);
    return validCells[getRandomInt(validCells.length)];
}



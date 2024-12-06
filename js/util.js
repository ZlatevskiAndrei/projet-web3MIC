"use strict"

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function isBoatConflict(generatedBoats, startingCell, direction, size) {
    if (!generatedBoats.length) return false;
    const isOccupied = (x, y) => generatedBoats.some(boat => boat.some(cell => cell.x === x && cell.y === y));
    let x = startingCell.x;
    let y = startingCell.y;
    for (let i = 0; i < size; i++) {
        if (isOccupied(x, y)) return true;
        x += direction.x;
        y += direction.y;
    }
    return false;
}

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
    } else  throw new Error;
    
}

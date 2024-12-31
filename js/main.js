"use strict"
import { appendBoats, initGrids, appendBoatsIndicators } from './dom.js';
import { boat_placements, human_boats, AI_boats, start_game } from './bataille-navale.js';

document.addEventListener("DOMContentLoaded", () => {
    boat_placements(human_boats);
    boat_placements(AI_boats);
    initGrids();
    appendBoats(human_boats, "PlayerGrid");
    //appendBoats(AI_boats, "BotGrid"); // On cache les bateaux de notre adversaire :)
    appendBoatsIndicators("indicatorAI");
    appendBoatsIndicators("indicatorPlayer");
    start_game("PlayerGrid", "BotGrid", human_boats, AI_boats);
});

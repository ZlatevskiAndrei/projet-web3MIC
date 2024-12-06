"use strict"
import { appendBoats, initGrids, initGridEvents } from './dom.js';
import { boat_placements, human_boats, AI_boats } from './bataille-navale.js';

document.addEventListener("DOMContentLoaded", () => {
    boat_placements(human_boats);
    boat_placements(AI_boats);
    initGrids();
    initGridEvents("PlayerGrid");
    initGridEvents("BotGrid");
    appendBoats(human_boats, "PlayerGrid")
    appendBoats(AI_boats, "BotGrid")
});

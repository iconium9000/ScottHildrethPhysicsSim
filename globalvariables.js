/*
Using global variables in this way is very much frowned upon,
but my goal for this document is to very each to follow and understand.

The goal of this project is not security; it is easy of use and modification.
*/

let collisiontoggle = true; // collision type (true: simple, false: complex)
let showgridtoggle = false; // collision grid draw (true: show, false: hide)
const palletlength = 6; // the number of colors in each pallet
const pallets = { // color pallets from a bunch of pixar movies
  "Monsters, Inc.": ["#006ED0","#518EFF","#5DBCD2","#B48CFC","#5BFC4B","#9CFC6C"],
  "Toy Story": ["#F1060B","#1A48A0","#FFEE15","#EAAB66","#B4DC8C","#742C64"],
  "Cars": ["#E9302A","#A46C64","#EC7B4B","#EEF50F","#736B7B","#2C2424"],
  "Finding Nemo": ["#EB4511","#040414","#FCF44C","#045CFC","#6BCBF3","#048B7C"],
  "The Incredibles": ["#AA0A00","#D52D12","#EB8B25","#F4B900","#0B0B0B","#E7A17E"],
  "Wall-E": ["#CC743C","#A49C94","#FCC41C","#F4F4FC","#040404","#0464A4"],
  "Inside Out": ["#0494EC","#FCE4B4","#D4EC7C","#BC84DC","#74BB43","#B3240B"],
  "Coco": ["#FCDC84","#7C4C74","#643404","#FC5C14","#EC4494","#2395CB"]
}
let palletname = "The Incredibles"; // the name of the currently active pallet
let colortally = 0; // pallet ball iterator
let balls = []; // list of balls on screen
let numballs = 1, ballradius = 5, balldensity = 5; // ball specs
const pi2 = 2 * Math.PI; // used in drawing each ball
let maxradius = 0; // The size of the largest ball on screen
let time = (new Date()).getTime() // for interframe timekeeping

const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// point locations {x,y} mouse interactions
let mousedown = null, mouseup = null;
// get mouse location from given mouse event listener
const getmouse = e => { return {x:e.offsetX,y:e.offsetY}; };

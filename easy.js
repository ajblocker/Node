//EASY: Create a node application that will read all of the planets in the solar system from a text file 
//and print them to the console.
//Text file: mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,pluto (I still believe in you pluto)  
const fs = require('fs');

//reads solarsystem file, throws error and prints to console
fs.readFile('./solarsystem.txt','utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})


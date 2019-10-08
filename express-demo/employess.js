const fs = require('fs');

let employees = fs.readFileSync('employees.json');
//parse the raw data into text and into object
let employee = JSON.parse(employees);
console.log(employee);
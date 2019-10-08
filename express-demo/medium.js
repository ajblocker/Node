//MEDIUM: Create a JSON file that will have 10 employees in it, their employeeID, their name, their salary and department name.
//Then, create an express API so that when you hit the endpoint with a GET request we want the api to 
//respond with all data on the employees.
//If you hit the endpoint with their employeeID, we want to hand up only the information on that one employee.
//If you hit the endpoint with an incorrect employeeID, send back the correct HTTP status code and an 
//error message stating that the employee was not found.


const express = require('express');
const app = express();
const fs = require('fs');

let employees = fs.readFileSync('employees.json');
//parse the raw data into text and into object
let employee = JSON.parse(employees);
console.log(employee);

app.get('/', (req, res) => {
    res.send('Welcome to the Page');
});
// GET::myendpointname.com/employees = Json with information from all 10 employees.
//grabs all employees
app.get('/employees', (req, res) => {
    res.send(employee);
});

// GET::myendpointname.com/employees/<employeeID> = Json with the information from that specific employee.
//grabs specifics employee and search through all 10,
//sends error if not found
app.get('/employees/:id',(req, res) => {
    const emp = employee.find(c => c.employeeID === parseInt(req.params.id));
    if (!emp) res.status(404).send('That Employee Was Not Found')
    res.send(emp);
});
app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

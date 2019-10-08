//HARD: Add the remaining CRUD functionality to your medium problem.
//Make sure you return the proper HTTP status codes based on the outcome of the request. 
//Be sure to implement error checking here.
//If an invalid request is made, we want to return some sort of error message and the correct HTTP status code 
//for the situation.

const Joi = require('joi');
const express = require('express');
const app = express();
const fs = require('fs');

//use middleware
app.use(express.json());

//parse the raw data into text and into object
let employees = JSON.parse(fs.readFileSync('employees.json'));
// let employee = JSON.parse(employees);
// console.log(employee);

// GET::myendpointname.com/employees = Json with information from all 10 employees.
app.get('/', (req, res) => {
    res.send('Welcome to the Page');
});
// GET::myendpointname.com/employees = Json with information from all 10 employees.
//grabs all employees
app.get('/employees', (req, res) => {
    res.send(employees);
});

// POST::myendpointname.com/employees  =  Inserts new employee into your data.
app.post('/employees', (req, res) => {
    //400 response
    const { error } = validateEmployee(req.body);
    if (error) {
        return res.status(400).send(result.error.details[0].message);
    } else {
         res.status(201);
    }

    const employee = {
        id: employees.length + 1,
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    };
    employees.push(employee);
    res.send(`${res.statusCode}`, employee);
});

// PUT::myendpointname.com/employees/<employeeID>  =  Updates information for specified employee.
//search through employees
app.put('/employees/:id', (req, res) => {
    const people = employees.find(c => c.employeeID === parseInt(req.params.id));
    if (!people) {
        return res.status(404).send('404 That Employee Was Not Found');
    } else {
     res.status(200);
}
    
    //result.error
    const { error } = validateEmployee(req.body);
    if (error) 
       return res.status(400).send(result.error.details[0].message);

    people.name = req.body.name
    res.send(`${res.statusCode}`, people);
});

//min of 3 characters, required validation
function validateEmployee(employee) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(employee, schema);
}

// GET::myendpointname.com/employees/<employeeID> = Json with the information from that specific employee.
//grabs specifics employee and search through all 10,
//sends error if not found
app.get('/employees/:id',(req, res) => {
    const people = employees.find(c => c.employeeID === parseInt(req.params.id));
    if (!people) {
        return res.status(404).send('404 That Employee Was Not Found')
    } else {
        res.status(200);
    }
    res.send(`${res.statusCode}`, people);
});

// DELETE::myendpointname.com/employees/<employeeID>  =  Removes the employee with that ID from the data
//search through index, removes item
app.delete('/employees/:id', (req, res) => {
    const people = employees.find(c => c.employeeID === parseInt(req.params.id));
    if (!people) return res.status(404).send('That Employee Was Not Found')

    const index = employees.indexOf(people);
    employees.splice(index, 1);

    res.send(`${res.statusCode}`, people);
})

//returns http server
app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

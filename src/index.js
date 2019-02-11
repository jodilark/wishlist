const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const app = express();
const config = require('./config')
const port = config.port;

// CORS
app.use(function(req, res, next) {
    var allowedOrigins = ['http://127.0.0.1:8010', 'http://localhost:8010', 'http://127.0.0.1:4203', 'http://localhost:4203'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8010');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(bodyParser.json());

// massive({
//     host: config.host
//     , port: config.dbPort
//     , database: config.database
//     , user: config.user
//     , password: config.password
//   }).then(function (db) {
//     app.set('db', db),
//       console.log('connected to database')
//   });
var durations = ['Daily', 'Weekly', 'Every Other Week', 'Bi-Monthly', 'Monthly', 'Quarterly', 'Bi-annually', 'Yearly'];
var items = [
    {
        name:'motorcycle',
        cost:5000,
        dueDate: new Date('2019-07-01'),
        deposit:50,
        frequency:durations[1],
        ready:false
    },
    {
        name:'Hot Tub',
        cost:4000,
        dueDate: new Date('2019-10-01'),
        deposit:100,
        frequency:durations[2]
    },
    {
        name:'Bowie Concert',
        cost:4000,
        dueDate: new Date('2019-10-13'),
        deposit:100,
        frequency:durations[3]
    }
]

//ITEMS
app.get('/api/items', (req, res, next) => {
    res.status(200).send(items);
});
app.post('/api/createItem', (req, res, next) => {
    items.push({
        name: req.body.name,
        cost: req.body.cost,
        dueDate: req.body.dueDate,
        deposit: req.body.deposit,
        frequency:req.body.frequency,
        ready:req.body.ready
    })
    res.status(200).send(items)
});

app.delete('/api/deleteItems', (req, res, next) => {
    let nameList = req.body.map(item => { return item.name });

    items = items.filter((item, i) => {
        // debugger
        if(nameList.indexOf(item.name) > -1){
            return;
        } else {
            return item;
        }
    })
    
    res.status(200).send(items);
});

app.listen(port, function(){
    console.log('listening on port: ', port);
    return "0.0.0.0";
});
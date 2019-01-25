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
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
var durations = ['Weekly', 'Every Other Week', 'Bi-Monthly', 'Monthly', 'Quarterly', 'Bi-annually', 'Yearly'];
var items = [
    {
        id:1,
        name:'motorcycle',
        cost:5000,
        dueDate: new Date('2019-07-01'),
        amount:50,
        duration:durations[1],
        ready:false
    },
    {
        id:2,
        name:'Hot Tub',
        cost:4000,
        dueDate: new Date('2019-10-01'),
        amount:100,
        duration:durations[2],
        ready:true
    },
    {
        id:3,
        name:'Bowie Concert',
        cost:4000,
        dueDate: new Date('2019-10-13'),
        amount:100,
        duration:durations[3],
        ready:true
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
        amount: req.body.amount,
        duration:req.body.duration,
        ready:req.body.ready
    })
    res.status(200).send(items)
});

app.listen(port, function(){
    console.log('listening on port: ', port);
    return "0.0.0.0";
});
//Libraries
const express = require('express');
require('dotenv').config();

//App
const app = express();

//Environment variables
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());

//Routes

const users = 
    [
        {id: 1, name: 'akme'},
        {id: 2, name: 'adonis'},
        {id: 3, name: 'felipe'},
        {id: 4, name: 'lara'}
    ];


app.get('/', (req, res)=>
{
    res.send({name: 'Akme', age:18});
});

app.get('/api/users', (req, res)=>
{
    //const user = users.map(e => `[${e.id}:${e.name}]`);
    res.send(users);
});

app.get('/api/users/:id', (req, res)=>
{
    const user = userSearch(req.params.id);

    if(user) res.send(user);

    else res.status(404).send(`<h1>El usuario no existe</h1>`);
    
});

app.post('/api/users', (req, res)=>
{
    const user = { id: users.length + 1, name: req.body.name };

    if(user.name)
    {  
        users.push(user);
        res.send({id: user.id, name: user.name, value: true});
        return;
    }

    res.send({id: user.id, name: user.name, value: false});
});

app.put('/api/users/:id', (req, res)=>
{
    const user = userSearch(req.params.id);

    if(user && req.body.name)
    {
        user.name = req.body.name;
        //users[user.id - 1].name = req.body.name;
        res.send({id: user.id, name: user.name, value: true});
        return;
    };

    res.send({id: req.params.id, name: req.body.name, value: false});
    
});

app.delete('/api/users/:id', (req, res)=>
{
    const user = userSearch(req.params.id);

    if(user)
    {
        users.splice(users.indexOf(user), 1);
        res.send({id: user.id, name: user.name, value: true});
    };

    res.send({id: req.params.id, value: false});
});

//Listen server
app.listen(port, ()=>
{
    console.log('Server start');
});

//Helpers

function userSearch(id)
{
    return users.find(e => e.id === parseInt(id));
}
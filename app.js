const express = require('express');
const bodyParser=  require('body-parser');
const app= express();
app.use(bodyParser.json());
const path = require('path');
const db = require('./db');
const {getdb,getPrimaryKey,connect} = require('./db');


//table name 
const collection ='todo'; 


//get route for static HTML file to the user
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
}) 

//get route to query db for all todos in out coolection to the user
app.get('/getTodos',(req,res)=>{
    db.getdb().collection(collection).find({}).toArray((err,documents)=>{
        
        if(err){
            console.log(err);
        }
        else{
            console.log(documents);
            res.json(documents);

        }
    })
})

//update 
app.put('/:id',(req,res)=>{
    const todoId= req.params.id;
    const userInput= req.body;
    db.getdb().collection(collection).findOneAndUpdate({_id:db.getPrimaryKey(todoId)},{$set: {todo:userInput.todo}},{returnOriginal:false},
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result)
        }
    }    )
})

//create 
app.post('/',(req,res)=>{
    const userInput=req.body;

    db.getdb().collection(collection).insertOne(userInput,(error,result)=>{
        if(error){
            console.log(error.name);
        }
        else{
            res.json({result: result, document: userInput});
        }
    });
});


app.delete('/:id',(req,res)=>{
    const todoId = req.params.id;

    db.getdb().collection(collection).findOneAndDelete({_id:db.getPrimaryKey(todoId)},
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }

    })
})

db.connect((err)=>{
    if(err){
        console.log('Unable to connect to database');
        //terminate app
        //process.exit(1);
    }
    else{
        app.listen(3000,()=>{
            console.log('Connected to db and app is listening on port 3000')
        });
    }
})
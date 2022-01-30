//require mongo db driver
const MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectId;
//db name
const dbname = 'crud_mongodb';

//default location of mongo db on my pc
const url ='mongodb://localhost:27017'
const mongoOptions = {useNewUrlParser: true};

//connection btw node and mongo
const state ={
    db:null
};

const connect = (cb)=>{
    if(state.db) //if there is db connection
        cb();
    else {
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }

}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
} 


const getdb= ()=>{
    return state.db;
}


module.exports = {getdb,connect,getPrimaryKey};
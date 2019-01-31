/*jshint esversion:6*/

// To spin up local server use below instruction
//cd /Program Files/MongoDB/Server/4.0/bin \
//then run
//mongod.exe --dbpath /Users/adamp/mongo-data

// NOTE: Mongo DB native Documantation: http://mongodb.github.io/node-mongodb-native/

const {MongoClient, ObjectID} = require('mongodb');

//db connection
//dep
const herkuDB = 'mongodb://heroku_jq2k8b5m:oteuiavf5t3k8t5olvdsp0e49h@ds145694.mlab.com:45694/heroku_jq2k8b5m';
//dev
const mlabDB = 'mongodb://user:mcgtest2018@ds145704.mlab.com:45704/crdo_req_test';
//test
const localDB = 'mongodb://localhost:27017/maintReq';

const dataBase = mlabDB;


//insert record into DB
const insertDB = (record, collection) => {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(dataBase, (err, client) => {
      if (err) {
        return console.log('Error: problem connecting to mongoDB');
      }
      console.log('Connected to mongoDB');
      const db = client.db('crdo_req_test');

      db.collection(collection).insertOne(record,(err, res) => {
        if (err) {
          return console.log('Error: and error occurd on insertOne', err);
        }
        resolve(res.ops[0]);
      });
      client.close();
    });
  });
}

const updateDB = (id,record) => {
  return new Promise(function(resolve, reject) {
    console.log('record', record);
    MongoClient.connect(dataBase, (err, client) => {
      if (err) {
        return console.log('Error: problem connecting to mongoDB');
      }
      console.log('connected to mongoDB');
      const db = client.db('crdo_req_test');

      db.collection('firstReq').findOneAndUpdate({
        _id: new ObjectID(id)
      },{
        $set: {
          status: record,
        }
      },{
        returnOriginal: false
      }).then((res) => {
        console.log('Record updated');
      })
      client.close();
    });
  });
};


const logDB = (id, logEntry) => {
return new Promise(function(resolve, reject) {
  MongoClient.connect(dataBase, (err, client) => {
    if (err) {
      return console.log('Error: problem connecting to mongoDB');
    }
    console.log('connected to mongoDB');
    const db = client.db('crdo_req_test');

    db.collection('firstReq').findOneAndUpdate({
      _id: new ObjectID(id)
    },{
      $push: {
        activity: {
          Date: new Date,
          activity:logEntry,

        },
      }
    },{
      returnOriginal: false
    }).then((res) => {
      console.log('Record updated');
    })
    client.close();
  });
});
};

const getVendor = (location, serviceType) => {
  return new Promise(function(resolve, reject) {
    // MongoClient.connect(dataBase, (err, client) => {
    //   if (err) {
    //   return console.log('Error: problem connecting to mongoDB');
    //   }
    //   console.log('connected to mongoDB');
    //   const db = client.db('crdo_req_test');
    //
    //
    //     //find array of vendors by location
    //   db.collection('vendors').find({
    //     //location????
    //   }.then((value) => {
    //     console.log(value);
    //   })
    //   client.close();
    // });
  });
};


module.exports = {insertDB, updateDB, logDB, getVendor};

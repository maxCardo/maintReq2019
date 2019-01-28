
const {MongoClient, ObjectID} = require('mongodb');

const id = '5c47245b63c19210fc6f89d5';
const dataBase = 'mongodb://localhost:27017/maintReq'
const logEntry = 'test log entry';


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

logDB(id, logEntry);

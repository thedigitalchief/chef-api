/**
*Configurations defined for environments (DEV,STAGING and PROD) for Mongo Database
*/

// var node_env = process.env.NODE_ENV;
// var config = {};
const MONGODB_LOCAL = "mongodb+srv://digitalchief:digitalchief@cluster0.ilyyqux.mongodb.net/digitalchief-db?retryWrites=true&w=majority";
// const MONGODB_DEV = "mongodb://localhost:27017/chefjoy";
// const MONGODB_PROD = "mongodb://10.0.0.210:27017/chefjoy";


const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect( MONGODB_LOCAL, { useUnifiedTopology: true  });
mongoose.connection.once('open',function() {
   console.log('Successful onnection has been made!');
}).on('error',function(error){
   console.log('error is :', error);
});

module.exports = mongoose;

// if(node_env === "prod") {
//     config = {
//         "DBURL" : MONGODB_PROD,
//         "ENV"   : "prod"
//     };
// } else if(node_env === "staging"){
//     config = {
//         "DBURL": MONGODB_STAGE,
//         "ENV"   : "staging",
//         "URL"  : ""
//     };
// } else if(node_env == "dev"){
//     config = {
//         "DBURL": MONGODB_DEV,
//         "ENV"  : "dev",
//         "BASE_URL"  : ""
//     };
// } else {
//     config = {
//         "DBURL" : MONGODB_LOCAL,
//         "ENV"   : "local",
//         "BASE_URL"  : ""
//     };
// }


// module.exports = config;



// heroku postgres database configuration
// let DbHost='ec2-54-247-89-181.eu-west-1.compute.amazonaws.com';
// let DbPort='3306';
// let Dbname='d118jlpdg3tra9';
// let DbUserName='ezyywaujxtlotu';
// let DbPassword='b05f1caa7e79bd13c0906fde89d5ea75c39c392cfea99ec92f8b56ee5885fe6c';
// let ssl=true;

// let connectionString='DATABASE_URL: postgres://ezyywaujxtlotu:b05f1caa7e79bd13c0906fde89d5ea75c39c392cfea99ec92f8b56ee5885fe6c@ec2-54-247-89-181.eu-west-1.compute.amazonaws.com:5432/d118jlpdg3tra9';

// // local postgres configuration
let DbHost = 'localhost';
let DbPort = '5432';
let Dbname = 'My_dictionary';
let DbUserName = 'postgres';
let DbPassword = 'amn';
let ssl=false;

//postgress connection string
// var DbConnectionString="postgressql://"+DbUserName+DbPassword+"@"+DbHost+":"+DbPort+"/"+Dbname;


module.exports = { DbHost, DbPort, Dbname, DbUserName, DbPassword ,ssl,connectionString};

// // i was use it with mysql 
// let DbHost = 'localhost';
// let DbPort = '3000';
// let Dbname = 'medical';
// let DbUserName = 'ali';
// let DbPassword = 'ali';
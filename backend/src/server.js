const path = require('path');
const dotenv = require('dotenv');
const app = require('./app');
var mysql=require('mysql');
require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
var con= mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:'',
  database:process.env.DB_NAME
})
con.connect(function(err,){
  if(err)err;
  console.log("Connection Successful")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



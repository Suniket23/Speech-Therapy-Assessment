const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const morgan = require('morgan');
const cors = require('cors');
var fs = require('fs');
var multer = require('multer');
var util = require('util');
// const { err } = require('react-native-svg/lib/typescript/xml');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'toor',
    database:'main'
});


var upload1 = multer();

// const connection = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'toor',
//     database:'main'
// })

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'toor',
    database:'main'
})



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })  


app.use(cors());
app.use(morgan('dev'));

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }
  
    if (connection) connection.release()
  
    return
  })
  
  // Promisify for Node.js async/await.
  pool.query = util.promisify(pool.query)

app.post('/insert',function(req,res) {
    var string = req.body.title;
    var string1 = req.body.subTitle;
    
    pool.query('insert into category(label) values(?)',[string],function(err,results,field) {
        if(err)
            throw err;
        console.log("results of inserting in category = ",results);
        // res.send(results);
    })

    pool.query('insert into subCategory(label,subLabel) values(?,?)',[string,string1],function(err,results,field) {
        if(err)
            throw err;
        console.log("results of inserting in sub category = ",results);
        // res.send(results);
    })
})

app.get('/getInfo',function(req,res){
    pool.query('select * from records ',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of getinfo = ",results);
        res.send(results);
    })
})
app.get('/getCategory',function(req,res) {
   
    pool.query('select * from category ',function(err,results,field) {
        if(err)
            throw err;
        console.log("Results of category = ",results);
        res.send(results);
    })
    
})
app.get('/getSubData',function(req,res) {
    console.log("IN sub data request ");
    pool.query('select * from subCategory ',function(err,results,field) {
        if(err)
            throw err;
        console.log("Results of get sub data = ",results);
        res.send(results);
    })
    
})
app.post('/getSubCategoryData',upload1.any('subCategory'),(req,res,next) =>{

    console.log("IN sub categ");
    const  obj = JSON.parse(JSON.stringify(req.body));
    console.log("OBJ = ",obj);
    const val = obj.subCategory;
   
        
        pool.query('select * from subCategory where label = ?',val,function(err,results,fields) {
            if(err)
            {
               console.log(err);
               throw err;  
             }                        
            console.log("Results of subcategory = ",results);
            res.send(results);
        })
  
    
})

app.post('/getImageAudio',upload1.single('category'),(req,res,next) => {
    console.log("IN Image audio");
    const  obj = JSON.parse(JSON.stringify(req.body));
    // console.log("obj = ",obj);
    const category = obj.category;
    const subCategory = obj.subCategory;   
   
    pool.query('select * from records where categoryName=? and ' + 'subCategoryName=? ',[category,subCategory],function(err,results,fields) {
        if(err)
                throw err;
            console.log("Results of Image Audio = ",results);
            res.send(results);
    })

})




app.post('/storeData',upload1.single('allData'),(req,res,next) => {
    console.log("IN store data");
    const  obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);

    var imageName = obj.imageName;    
    var audioName = obj.audioName;
    var categoryName = obj.category;
    var subCategoryName = obj.subCategory; 
   
    pool.query("insert into records(" +  "imageURL, " + "audioURL, " + "categoryName," + " subCategoryName) values(?,?,"+ "?,"+ "?)",[imageName,audioName,categoryName,subCategoryName],function(err,results,fields) {
        console.log("In query");
            if(err)
                throw err;
            console.log("Results = ",results);
            res.send(results);
    })
})

app.listen(3001, () => {
    console.log('Go to http://localhost:3001/insert so you can see the data.');
   });

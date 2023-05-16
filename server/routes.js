const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const morgan = require('morgan');
const cors = require('cors');
var fs = require('fs');
var multer = require('multer');
var util = require('util');
const { log } = require('console');
// import { Alert } from 'react-native';
// const { err } = require('react-native-svg/lib/typescript/xml');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Pastaway$33',
    database:'main'
});

con.connect(function(err){
    if(err) throw err;
    else console.log("connected!");
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
    password:'Pastaway$33',
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

app.get('/storeData',function(req,res){
    pool.query('select * from records ',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of records = ",results);
        res.send(results);
    })
})
app.post('/storeData',function(req,res){
    const {imageName,audioName,category,subCategory}=req.body;
    console.log("reqbody=",req.body);
    const sql = `INSERT INTO records (imageURL,audioURL,categoryName,subCategoryName) VALUES (?, ?, ?, ?)`;
    pool.query(sql, [imageName,audioName,category,subCategory], (error, res) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting user');
        }
        //   else {
        //   res.json('User inserted successfully');
        // }
    })
})
app.get('/assessment',function(req,res){
    pool.query('select * from assessment ',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of getinfo = ",results);
        res.send(results);
    })
})
app.post('/Assessment',function(req,res){
    const {audio,option1,option2,option3,correct_option}=req.body;
    console.log("option1=",req.body);
    // const {Option1,Option2,Option3,CorrectOption}=Info;
    const sql = `INSERT INTO assessment (audio,option1, option2, option3, correct_option) VALUES (?, ?, ?, ?, ?)`;
    pool.query(sql, [audio,option1, option2, option3, correct_option], (error, res) => {
        if (error) {
          console.error(error);
        //   res.status(500).send('Error inserting user');
        }
        //  else {
        //   res.send('User inserted successfully');
        // }
    });
})
app.post('/TakeAssess',function(req,res){
    const {iduser,name}=req.body;
    console.log("iduser=",iduser);
    const sql = `INSERT INTO user (iduser,name) VALUES (?, ?)`;
    pool.query(sql, [iduser,name], (error, res) => {
        if (error) {
          console.error(error);
        //   res.status(500).send('Error inserting user');
        // Alert("error while inserting user");
        }
    });
})
// app.post('/Quiz',function(req,res){
//     const {marks,iduser}=req.body;
//     console.log("marks=",marks);
//     const sql = `UPDATE user SET marks=? where iduser=?`;
//     pool.query(sql, [marks,iduser], (error, res) => {
//         if (error) {
//           console.error(error);
//         //   res.status(500).send('Error inserting user');
//         // Alert("error while inserting user");
//         }
//     });

// })
app.get('/TakeAssess',function(req,res){
    pool.query('select * from user',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of user = ",results);
        res.send(results);
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
   
    pool.query('select * from category group by label ',function(err,results,field) {
        if(err)
            throw err;
        console.log("Results of category = ",results);
        res.send(results);
    })
    
})

app.get('/records',function(req,res){
    pool.query('select * from records',function(err,results,field){
        if(err)
           throw err;
        console.log("results of records= ",results);
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

app.post('/deleteSubCategory',upload1.single('subValue'),(req,res,next) => {
    console.log("In delete Sub category");
    const  obj = JSON.parse(JSON.stringify(req.body));
    console.log("obj = ",obj);
    const value = obj.subValue; 
   
    pool.query('delete from subCategory where subLabel = ? ',value,function(err,results,fields) {
        if(err)
                throw err;
            console.log("Deleted from subcategory = ",results);
        // res.send(results);
    })
    
    pool.query('delete from records where subCategoryName = ? ',value,function(err,results,fields) {
        if(err)
                throw err;
            console.log("Deleted from records = ",results);
        // res.send(results);
    })

})

app.post('/deleteCategory',upload1.single('subValue'),(req,res,next) => {
    console.log("In delete  category");
    const  obj = JSON.parse(JSON.stringify(req.body));
    console.log("obj = ",obj);
    const value = obj.subValue; 
   
    pool.query('delete from category where label = ? ',value,function(err,results,fields) {
        if(err)
                throw err;
            console.log("Deleted from category = ",results);
        // res.send(results);
    })
    pool.query('delete from subCategory where label = ? ',value,function(err,results,fields) {
        if(err)
                throw err;
            console.log("Deleted from subcategory = ",results);
        // res.send(results);
    })
    pool.query('delete from records where categoryName = ? ',value,function(err,results,fields) {
        if(err)
                throw err;
            console.log("Deleted from records = ",results);
        // res.send(results);
    })

})

app.post('/updateData',upload1.single('category'),(req,res,next) => {
    console.log("IN Update Data");
    const  obj = JSON.parse(JSON.stringify(req.body));
    console.log("obj = ",obj);
    const category = obj.category;
    const subCategory = obj.subCategory;   
    const imageURL = obj.imageURL;
    const audioURL = obj.audioURL;

    console.log("Image url = ",imageURL);
    console.log("Audio URL = ",audioURL);
    if(audioURL && imageURL)
    {
        pool.query('update records set ' + 'imageURL=?, ' + 'audioURL=? where ' + 'categoryName=? and ' + 'subCategoryName=?',[imageURL,audioURL,category,subCategory],function(err,results,fields) {
            if(err)
                    throw err;
                console.log("Results of Image Audio = ",results);
                res.send(results);
        })
    }
    else if(imageURL)
    {
        pool.query('update records set ' + 'imageURL=? where ' + 'categoryName=? and ' + 'subCategoryName=?',[imageURL,category,subCategory],function(err,results,fields) {
            if(err)
                    throw err;
                console.log("Results of Image  = ",results);
                res.send(results);
        })
    }
    else if(audioURL)
    {
        pool.query('update records set ' + 'audioURL=? where ' + 'categoryName=? and ' + 'subCategoryName=?',[audioURL,category,subCategory],function(err,results,fields) {
            if(err)
                    throw err;
                console.log("Results of Audio = ",results);
                res.send(results);
        })
    }
    

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

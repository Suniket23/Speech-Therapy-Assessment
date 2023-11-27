const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const morgan = require('morgan');
const cors = require('cors');
var fs = require('fs');
var multer = require('multer');
var util = require('util');
const { log } = require('console');
const { json } = require('sequelize');
// import { Alert } from 'react-native';
// const { err } = require('react-native-svg/lib/typescript/xml');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var upload1 = multer();

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Mysqlop@123',
    database:'speechtherapyapplication'
})  


  


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
        res.send(results);
    })

    pool.query('insert into subCategory(label,subLabel) values(?,?)',[string,string1],function(err,results,field) {
        if(err)
            throw err;
        console.log("results of inserting in sub category = ",results);
        res.send(results);
    })
})

app.get('/card',function(req,res){
    pool.query('select * from card',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of card = ",results);
        res.send(results);
    })
})
app.post('/card',function(req,res){
    const {cardImg,cardAudio,mainCategory,subCategory}=req.body;
    console.log("reqbody=",req.body);
    const sql = `INSERT INTO card (cardImg,cardAudio,mainCategory,subCategory) VALUES (?, ?, ?, ?)`;
    pool.query(sql, [cardImg,cardAudio,mainCategory,subCategory], (error, res) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting user');
        }
          else {
          res.json('User inserted successfully');
        }
    })
})
app.get('/assess',function(req,res){
    pool.query('select * from assess ',function(err,results,field) {
        if(err)
            throw err;
        console.log("result of getinfo = ",results);
        res.send(results);
    })
})
app.post('/assess',function(req,res){
    const {audio,option1,option2,option3,correct_option}=req.body;
    console.log("option1=",req.body);
    // const {Option1,Option2,Option3,CorrectOption}=Info;
    const sql = `INSERT INTO assess (audio,option1, option2, option3, correct_option) VALUES (?, ?, ?, ?, ?)`;
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
app.post('/Quiz',function(req,res){
    const {score,patientid,submitDate}=req.body;
    console.log("patient info = ",req.body);
    const sql = `INSERT INTO progress (patientid,score,submitDate) VALUES (?, ?, ?)`;
    pool.query(sql, [patientid,score,submitDate], (error, res) => {
        if (error) {
          console.error(error);
        //   res.status(500).send('Error inserting user');
        }
        //  else {
        //   res.send('User inserted successfully');
        // }
    });
})
app.get('/TakeAssess',function(req,res){
    pool.query('select * from user',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of user = ",results);
        res.send(results);
    })
})

app.get('/getInfo',function(req,res){
    pool.query('select * from assess',function(err,results,field) {
        if(err)
            throw err;
        console.log("results of getinfo = ",results);
        res.send(results);
    })
})
app.get('/getCategory',function(req,res){
    pool.query('select mainCategory from card group by mainCategory',function(err,results,field){
        if(err){
            throw err;
        }
        console.log("results of category= ",results);
        res.send(results);
    })
})

app.get('/card',function(req,res){
    pool.query('select * from card',function(err,results,field){
        if(err)
           throw err;
        console.log("results of records= ",results);
        res.send(results);
    })
})

app.get('/doctor',function(req,res){
    pool.query('select * from doctor',function(err,results,field){
        if(err)
           throw err;
        console.log("results of doctor= ",results);
        res.send(results);
    })
})
app.get('/patient',function(req,res){
    pool.query('select * from patient',function(err,results,field){
        if(err)
           throw err;
        console.log("results of patient= ",results);
        res.send(results);
    })
})

app.post('/Register',function(req,res){
    const obj=req.body;
    console.log(req);
    var sql = `INSERT INTO patient (name,email,password,dob) VALUES (?,?,?,?)`;
    pool.query(sql,[obj.name.value,obj.email.value,obj.password.value,obj.dob],function(err,results){
        if(err)
           throw err;

        console.log("result of register=",results);
        res.send(results);
    })
})
app.get('/getSubData',function(req,res) {
    console.log("IN sub data request ");
    pool.query('select subCategory from card ',function(err,results,field) {
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
   
        
        pool.query('select subCategory from card where mainCategory = ?',val,function(err,results,fields) {
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
        res.send(results);
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
        res.send(results);
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
    console.log("obj = ",obj);
    const category = obj.category;
    const subCategory = obj.subCategory;   
   
    pool.query('select * from card where mainCategory=? and ' + 'subCategory=? ',[category,subCategory],function(err,results,fields) {
        if(err)
                throw err;
            console.log("Results of Image Audio = ",results);
            res.send(results);
    })

})



app.post('/Dcard',function(req,res){
    const value=req.body.cardID;
    console.log("cardID is ",value);
    pool.query('delete from card where cardID = ? ',value,function(err,results,fields) {
        if(err)
                throw err;
            console.log("Deleted from card = ",value);
        res.send(results);
    })
})
app.post('/storeData',function(req,res){
    const {cardImg,cardAudio,mainCategory,subCategory}=req.body;
    console.log("option1=",req.body);
    // const {Option1,Option2,Option3,CorrectOption}=Info;
    const sql = `INSERT INTO card (cardImg,cardAudio,mainCategory,subCategory) VALUES (?, ?, ?, ?)`;
    pool.query(sql, [cardImg,cardAudio,mainCategory,subCategory], (error, res) => {
        if (error) {
          console.error(error);
        //   res.status(500).send('Error inserting user');
        }
    });
})

app.post('/AssignCards',function(req,res){
    // const obj=JSON.parse(JSON.stringify(req.body));
    const pid=req.body.patientId;
    const cat=req.body.mainCategory;
    const subcat=req.body.subCategory;
    console.log("pid is = ",pid);
    console.log("category is= ",cat);
    console.log("subcategory is = ",subcat);
    const sql = `INSERT INTO learns (patientID,Category,subCategory) VALUES (?,?,?)`;
    pool.query(sql, [pid,cat,subcat], (error, res) => {
        if (error) {
          console.error(error);
        //   res.status(500).send('Error inserting user');
        }
    });
})  

app.get('/learns/:patientID', (req, res) => {
  const patientID = req.params.patientID;

  console.log(`got cards req for ${patientID}`);
console.log('Executing query:', 'SELECT * FROM learns WHERE patientID = ?', [patientID]);
  pool.query('SELECT * FROM learns WHERE patientID = ?', [patientID], (err, learnsResults) => {
  if (err) {
    console.error('Error executing learns query:', err);
    return res.status(500).json({ error: 'Error fetching learns data', details: err.message });
  }

    if (!learnsResults || learnsResults.length === 0) {
      console.log('No learns data found for patient ID:', patientID);
      return res.status(404).json({ error: 'No learns data found for patient ID' });
    }

    const categories = learnsResults.map(learn => learn.category);
    const subcategories = learnsResults.map(learn => learn.subCategory);
    console.log('Categories:', categories);
    console.log('Subcategories:', subcategories);

    // Fetch cards based on categories and subcategories
    pool.query('SELECT * FROM card WHERE mainCategory IN (?) AND subCategory IN (?)', [categories, subcategories], (err, cardResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching card data', details: err.message });
      }

      res.json({ learns: learnsResults, cards: cardResults });
    });
  });
});





app.listen(3001, () => {
    console.log('Go to http://localhost:3001/insert so you can see the data.');
   });

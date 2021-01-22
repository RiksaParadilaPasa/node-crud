const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_node'
});

conn.connect((err) => {
    if(err) throw err;
    console.log("Mysql Connected...");
});

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/assets',express.static(__dirname+'/public'));


app.get('/', (req,res) => {
    let sql = "SELECT * FROM produk"
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.render('index',{
            result: results
        });
    });
});


app.post('/save',(req,res) => {
    let data = {name:req.body.name,price:req.body.price}
    let sql = "INSERT INTO produk SET ? ";
    let query = conn.query(sql,data,(err,results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.post('/update',(req,res) => {
    let sql = "UPDATE produk SET name = '"+req.body.name+"', price = '"
                +req.body.price+"' WHERE id = '"+req.body.id+"'  ";
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.redirect('/');
    });
});


app.post('/delete',(req,res) => {
    let sql = "DELETE FROM produk WHERE id = '"+req.body.id+"'  ";
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.redirect('/');
    });
});


app.listen(8000,() => {
    console.log('Server is running at port 8000');
});

var mysql = require('mysql')

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 8080


app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'titanic_jc10'
})

app.get('/gettitanic', (req,res)=>{
    let sql= `select * from train`
    let {query} = req
    if(query){
        sql += ` where`
        // Nama, agemax and agemin, gender, pclass, survived
        if(query.name){
            sql += ` name like '%${query.name}%' and`
        }
        if(query.agemax && query.agemin) {
            sql += ` age <= ${query.agemax} and ${query.agemin} <= age and`
        }
        if(query.gender){
            sql += ` sex = '${query.gender}' and`
        }
        if(query.pclass){
            sql += ` Pclass = '${query.pclass}' and`
        }
        if(query.survived < 2){
            sql += ` survived = '${query.survived}' and`
        } 
    } 
    db.query(sql.slice(0, -4), (err,result)=>{
        try {
            if (err) throw err
            res.send(result)
        } catch (err) {
            console.log(err);
        }
    })  
})

app.get('/getclass', (req,res)=>{
    let sql = `select Pclass from train group by Pclass order by Pclass;`
    db.query(sql, (err,result)=>{
        try {
            if (err) throw err
            res.send(result)
        } catch (err) {
            console.log(err);
        }
    })
})

app.listen(port, console.log('Listenin in port ' + port))


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
    let sql= `select PassengerId, Survived, Pclass, Name, Sex, Age from train`
    db.query(sql, (err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.listen(port, console.log('Listenin in port ' + port))


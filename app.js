const express = require('express')
const {engine} = require('express-handlebars')
const bp = require('body-parser')
const multer = require('multer')

const app = express()
const upload = multer({dest: 'public/IMG'})

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/contato', (req, res)=>{
    res.render('contato')
})

app.get('/seu-seguro', (req, res)=>{
    res.render('seu-seguro')
})

app.get('/cotacao-auto', (req, res)=>{
    res.render('cotacao-auto')
})


app.listen(5500, ()=>{
    console.log("Rodei a porra do sistema carai na porta http://localhost:5500")
})
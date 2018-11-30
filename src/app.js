const express = require('express')
const app = express()
let config = require('./config')

app.use(express.static(__dirname+'/../'));


app.get('/',(req,res)=>{
    res.render('index.html')
})

let port = config.port

app.listen(port, (err,res) => {
    if(err)
    console.log(err)
    else
    console.log(`listening on port ${port}`)
})

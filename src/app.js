const express = require('express')
const app = express()

app.use(express.static(__dirname+'/../'));


app.get('/',(req,res)=>{
    res.render('index.html')
})

let port = process.env.PORT||3000

app.listen(port, (err,res) => {
    if(err)
    console.log(err)
    else
    console.log(`listening on port ${port}`)
})

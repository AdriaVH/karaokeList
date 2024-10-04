require ('dotenv').config();
const express= require('express')
const cors= require('cors')

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('client'))

app.get('/', (request, response)=>{
    response.send(`<h1 class="bg-black" >Hola</h1>`)
})

app.use("/api/songs", require('./routes/songs'))
app.use("/api/coords", require('./routes/coords'))

app.use( express.static('public'));

  

const port=process.env.PORT||3002
app.listen(port,'0.0.0.0',()=>{
    console.log(`Listening localhost: ${port}`)
})

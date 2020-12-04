const express = require('express')
const app = express()
const models = require('./models')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const users=[{
    username:'john',
    password: 'password'
},{
    username:'Marydoe',
    password:'password'
}]

app.get("/hello",(req,res)=>{
    res.send("hello")
})

app.get("/",(req,res)=>{
    models.Event.findAll()
    .then((events)=>{
        res.json(events)
    })
})

app.post('/add-event',(req,res)=>{
    let name = req.body.name
    let image = req.body.image
    let date = req.body.date
    let time = req.body.time
    let location = req.body.location
    let postcode = req.body.postcode
    let city = req.body.city
    let state = req.body.state
    let address = req.body.address

    let event=models.Event.build({
        name:name,
        image:image,
        date:date,
        time:time,
        location:location,
        postcode:postcode,
        city:city,
        state:state,
        address:address
    })

    event.save().then((newEvent)=> res.json({success:true}))

})

app.post('/delete-event/:eventID',(req,res)=>{
    let id = req.params.eventID

    models.Event.destroy({
        where:{
            id:id
        }
    })
    res.send(id)
})

app.post('/update-event/:eventID',(req,res)=>{
    const id = req.params.eventID
    let name = req.body.name
    let image = req.body.image
    let date = req.body.date
    let time = req.body.time
    let location = req.body.location
    let postcode = req.body.postcode
    let city = req.body.city
    let state = req.body.state
    let address = req.body.address

    models.Event.update({
        name:name,
        image:image,
        date:date,
        time:time,
        location:location,
        postcode:postcode,
        city:city,
        state:state,
        address:address
    },{
        where:{
            id:id
        }
    }).then(()=>{
        res.json({"success":true})
    })
})

app.post('/login', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password

    const persistedUser = users.find(user=>{
        return user.username== username && user.password ==password
    })

    if (persistedUser){
        res.json({sucess:true})
    } else {
        res.json({sucess:false})
    }
})



app.listen(8080,()=>{
    console.log("Server is Running")
})
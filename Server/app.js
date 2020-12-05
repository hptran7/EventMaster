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

    event.save().then((newEvent)=>res.json({success:newEvent.id}) )

})
app.post('/userEvent',(req,res)=>{
    let userId = req.body.userId
    let eventId = req.body.eventId
    let eventUser =  models.UserEvent.build({
        userId:userId,
        eventId:eventId,
    })
    eventUser.save().then((result)=> res.json({success:true}))
})

const addUserEvent= async (userId,eventId)=>{
    console.log(userId,eventId)
    await app.post('/userEvent',(req,res)=>{
        let userId = userid
        let eventId = eventid
        let eventUser =  models.UserEvent.build({
            userId:userId,
            eventId:eventId,
        })
        eventUser.save().then((result)=> res.json({success:true}))
    })
}

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

app.post('/create-user',(req,res)=>{
    let username= req.body.username
    let password = req.body.password

    const user = models.User.build({
        username:username,
        password: password
    })
    user.save().then((result)=> res.json({success:true}))
})

app.post('/login', async (req,res)=>{
    let username = req.body.username;
    let password = req.body.password

    const persistedUser = await models.User.findOne({
        where:{
            username:username,
            password:password
        }
    })

    if (persistedUser){
        res.json({success:true})
    } else {
        res.json({success:false})
    }
})



app.listen(8080,()=>{
    console.log("Server is Running")
})
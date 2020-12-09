const express = require("express");
const app = express();
const models = require("./models");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authentication = require("./authMiddleware");

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/", authentication, async (req, res) => {
  const userId = res.locals.userId;
  console.log(userId);
  //   models.Event.findAll().then((events) => {
  //     res.json(events);
  //   });
  let events = await models.UserEvent.findAll({
    include: [{ model: models.Event, as: "userEvent" }],
    where: {
      userId: userId,
    },
  });
  res.json(events);
});

app.post("/add-event", authentication, async (req, res) => {
  const userId = res.locals.userId;
  let name = req.body.name;
  let image = req.body.image;
  let date = req.body.date;
  let time = req.body.time;
  let location = req.body.location;
  let postcode = req.body.postcode;
  let city = req.body.city;
  let state = req.body.state;
  let address = req.body.address;

  let event = models.Event.build({
    name: name,
    image: image,
    date: date,
    time: time,
    location: location,
    postcode: postcode,
    city: city,
    state: state,
    address: address,
  });

  await event.save();

  const eventId = event.dataValues.id;
  await addUserEvent(userId, eventId);
  res.json({ success: true });
});

app.post("/userEvent", authentication, (req, res) => {
  let userId = req.body.userId;
  let eventId = req.body.eventId;
  let eventUser = models.UserEvent.build({
    userId: userId,
    eventId: eventId,
  });
  eventUser.save().then((result) => res.json({ success: true }));
});

const addUserEvent = (userId, eventId) => {
  let eventUser = models.UserEvent.build({
    userId: userId,
    eventId: eventId,
  });
  eventUser.save();
};

app.post("/delete-event/:eventID", authentication, (req, res) => {
  let id = req.params.eventID;

  models.UserEvent.destroy({
    where: {
      id: id,
    },
  });
  res.send(id);
});

app.post("/update-event/:eventID", authentication, (req, res) => {
  const id = req.params.eventID;
  let name = req.body.name;
  let image = req.body.image;
  let date = req.body.date;
  let time = req.body.time;
  let location = req.body.location;
  let postcode = req.body.postcode;
  let city = req.body.city;
  let state = req.body.state;
  let address = req.body.address;

  models.Event.update(
    {
      name: name,
      image: image,
      date: date,
      time: time,
      location: location,
      postcode: postcode,
      city: city,
      state: state,
      address: address,
    },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.json({ success: true });
  });
});

app.post("/create-user", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = models.User.build({
    username: username,
    password: password,
  });
  user.save().then((result) => res.json({ success: true }));
});

app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const persistedUser = await models.User.findOne({
    where: {
      username: username,
      password: password,
    },
  });

  if (persistedUser) {
    var token = jwt.sign(
      { username: username, userId: persistedUser.id },
      "MYSECRET125"
    );
    res.json({ token: token });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

app.listen(8080, () => {
  console.log("Server is Running");
});

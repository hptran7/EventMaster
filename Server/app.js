const express = require("express");
const app = express();
const models = require("./models");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authentication = require("./authMiddleware");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

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
app.get("/alertEvent", authentication, async (req, res) => {
  const userId = res.locals.userId;
  let events = await models.UserEvent.findAll({
    include: [{ model: models.Event, as: "userEvent" }],
    where: {
      userId: userId,
    },
  });
  res.json(events);
});

app.get("/update-event/:eventid", authentication, async (req, res) => {
  const eventId = req.params.eventid;
  const event = await models.Event.findOne({
    where: {
      id: eventId,
    },
  });
  res.json(event);
});

app.post("/add-event", authentication, async (req, res) => {
  const userId = res.locals.userId;
  let name = req.body.name;
  let image = req.body.image ? req.body.image : "no Image";
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
    hostBy: res.locals.userId,
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
  console.log(id);
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

app.post("/update-event-covid/:eventID", authentication, (req, res) => {
  const id = req.params.eventID;
  const covidStatus = 1;

  models.Event.update(
    {
      covidStatus: covidStatus,
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

app.post("/invite-friend", authentication, async (req, res) => {
  const invitedUser = req.body.invitedUser;
  const eventId = req.body.eventId;
  const isActive = 1;
  const persistedUser = await models.User.findOne({
    where: {
      username: invitedUser,
    },
  });
  console.log(persistedUser);

  if (persistedUser) {
    const invitation = models.Invitation.build({
      invitedUser: invitedUser,
      eventId: eventId,
      isActive: 1,
    });
    await invitation.save();
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.get("/invitation", authentication, async (req, res) => {
  const userId = res.locals.userId;
  const persistedUser = await models.User.findOne({
    where: {
      id: userId,
    },
  });
  const persistedUsername = persistedUser.dataValues.username;
  const invitations = await models.Invitation.findAll({
    include: [{ model: models.Event, as: "userEvent" }],
    where: {
      invitedUser: persistedUsername,
    },
  });
  res.json(invitations);
});

app.post("/update-invitation/:invitationid", async (req, res) => {
  const invitationId = req.params.invitationid;
  models.Invitation.destroy({
    where: {
      id: invitationId,
    },
  });
});

app.listen(PORT, () => {
  console.log("Server is Running");
});

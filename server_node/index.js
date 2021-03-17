const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { json } = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "timebanking",
    resave: false,
    saveUninitialized: true,
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456",
  database: "TimeBanking",
});

app.get("/user_list", (req, res) => {
  db.query("select * from user", (err, result) => {
    if (result.length == 0) {
      res.send("no user");
    } else {
      db.query(
        "select * from user where name = ?",
        [req.query.name],
        (err, result) => {
          if (result.length == 0) {
            res.send("no matched user from database");
          } else {
            res.send(result);
          }
        }
      );
    }
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const password = req.body.password;
  const address = req.body.address;

  db.query(
    "INSERT INTO user (name, password, address) VALUES (?,?,?)",
    [name, password, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// login post method for supervisor
app.post("/admin_login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  if (name == "admin") {
    db.query(
      "SELECT * FROM user WHERE name = ? AND password = ?",
      [name, password],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length != 0) {
          req.session.user = result;
          console.log(req.session.user);
          res.send({ message: "supervisor is logged in", result: result });
        }
      }
    );
  } else {
    res.send({ message: "wrong name for administrator" });
  }
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE name = ? AND password = ?",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length != 0) {
        req.session.user = result;
        console.log(req.session.user);
        res.send({ message: "you are logged in", result: result });
      } else {
        res.send({ message: "no matched user" });
      }
    }
  );
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    console.log(req.session);
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("session destroyed");
});

app.post("/createProvider", (req, res) => {
  const provider_service = req.body.provider_service;
  const provider_price = req.body.provider_price;
  if (req.session.user) {
    const provider_name = req.session.user[0].name;
    const provider_vid = req.session.user[0].address;
    db.query(
      "INSERT INTO provider (provider_name, provider_service, provider_price, provider_vid) VALUES (?,?,?,?)",
      [provider_name, provider_service, provider_price, provider_vid],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
});

app.get("/showProviders", (req, res) => {
  db.query("SELECT * FROM provider", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createRecipient", (req, res) => {
  const serviceid = req.body.recipient_serviceid;
  const provider_name = req.body.provider_name;
  const name = req.body.recipient_name;
  const service_info = req.body.recipient_serviceinfo;
  const price = req.body.recipient_price;
  const address = req.body.recipient_vid;
  db.query(
    "INSERT INTO recipient (service_id, provider_name, recipient_name, recipient_service, recipient_price, recipient_vid) VALUES (?,?,?,?,?,?)",
    [serviceid, provider_name, name, service_info, price, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/showRecipients", (req, res) => {
  db.query("SELECT * FROM recipient", (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length != 0) {
      res.send(result);
    } else {
      res.send("empty recipient list");
    }
  });
});

app.get("get");

app.listen(3001, () => {
  console.log("success");
});

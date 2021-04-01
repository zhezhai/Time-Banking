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
  port: 3306,
});

//====================================== api =========================================

//get all users
app.get("/user_list", (req, res) => {
  db.query("select * from user", (err, result) => {
    if (result.length === 0) {
      res.send("no user");
    } else {
      db.query(
        "select * from user where name = ?",
        [req.query.name],
        (err, result) => {
          if (result.length === 0) {
            res.send("no matched user from database");
          } else {
            res.send("user already exist");
          }
        }
      );
    }
  });
});

app.get("/getUser", (req, res) => {
  const username = req.query.username;
  db.query("SELECT * from user WHERE name = ?", [username], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "get user from list", result: result });
    }
  });
});

//set a user's balance
app.post("/setUserBalance", (req, res) => {
  const address = req.body.address;
  const balance = req.body.balance;
  db.query(
    "UPDATE user SET balance = ? WHERE address = ?",
    [balance, address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          res.send("user balance not updated");
        } else {
          res.send({ message: "user balance updated!", result: result });
        }
      }
    }
  );
});

//register a user
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

//user login
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
        res.send({
          message: "you are logged in",
          result: result,
        });
      } else {
        res.send({ message: "no matched user" });
      }
    }
  );
});

//get user login status
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    console.log(req.session);
    res.send({ loggedIn: false });
  }
});

//log out a user
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("session destroyed");
});

//get the provider list
app.get("/getServices", (req, res) => {
  db.query("SELECT * FROM service", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "get all services successful", result: result });
    }
  });
});

//create the provider when provider posted a service
app.post("/createProvider", (req, res) => {
  const post_type = req.body.post_type;
  const service_info = req.body.service_info;
  const price = req.body.price;
  const contract_address = req.body.contract_address;
  if (req.session.user) {
    const provider_name = req.session.user[0].name;
    const provider_vid = req.session.user[0].address;
    db.query(
      "INSERT INTO service (post_type, provider_name, provider_vid, service_info, price, contract_address) VALUES (?,?,?,?,?,?)",
      [
        post_type,
        provider_name,
        provider_vid,
        service_info,
        price,
        contract_address,
      ],
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

// insert the provider information when choosing a service requested by a recipient
app.post("/updateProvider", (req, res) => {
  const provider_name = req.body.provider_name;
  const provider_vid = req.body.provider_vid;
  const id = req.body.id;
  db.query(
    "UPDATE service SET provider_name = ?, provider_vid = ? WHERE id = ?",
    [provider_name, provider_vid, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "updateProvider successful", result: result });
      }
    }
  );
});

//alter the provider status for service display, 0 is not choosen, 1 is choosen, 2 is confirmed
app.post("/updateProviderStatus", (req, res) => {
  const provider_status = req.body.provider_status;
  const provider_id = req.body.id;
  db.query(
    "UPDATE service SET provider_status = ? WHERE id = ?",
    [provider_status, provider_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          res.send("provider not updated");
        } else {
          res.send({ message: "provider updated!", result: result });
        }
      }
    }
  );
});

//create a recipient when user clicks on the service card on dashboard
app.post("/createRecipient", (req, res) => {
  const post_type = req.body.post_type;
  const service_info = req.body.service_info;
  const price = req.body.price;
  const contract_address = req.body.contract_address;
  if (req.session.user) {
    const recipient_name = req.session.user[0].name;
    const recipient_vid = req.session.user[0].address;
    db.query(
      "INSERT INTO service (post_type, recipient_name, recipient_vid, service_info, price, contract_address) VALUES (?,?,?,?,?,?)",
      [
        post_type,
        recipient_name,
        recipient_vid,
        service_info,
        price,
        contract_address,
      ],
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

app.post("/updateRecipient", (req, res) => {
  const recipient_name = req.body.recipient_name;
  const recipient_vid = req.body.recipient_vid;
  const id = req.body.id;
  db.query(
    "UPDATE service SET recipient_name = ?, recipient_vid = ? WHERE id = ?",
    [recipient_name, recipient_vid, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "uodateRecipient successful", result: result });
      }
    }
  );
});

//alter the recipient status for service display, 0 is not finished, 1 is finished
app.post("/updateRecipientStatus", (req, res) => {
  const status = req.body.recipient_status;
  const id = req.body.id;
  db.query(
    "UPDATE service SET recipient_status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length === 0) {
          res.send("recipient not updated");
        } else {
          res.send({ message: "recipient updated!", result: result });
        }
      }
    }
  );
});

app.get("/showContracts", (req, res) => {
  db.query(
    "SELECT * FROM contract WHERE contract_status = 0",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "get aviliable contracts", result: result });
      }
    }
  );
});

app.post("/alterContract", (req, res) => {
  const status = req.body.status;
  const contract_addr = req.body.contract_addr;
  db.query(
    "UPDATE contract SET contract_status = ? WHERE contract_address = ?",
    [status, contract_addr],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "alter contract succeed", result: result });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("success");
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://dbShuhin:TDTY86Wn4CBLgi3s@cluster0-kw21o.mongodb.net/Doctors_Portal?retryWrites=true&w=majority";
let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//get the data
app.get("/items", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("item");
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.send(err);
        client.close();
      } else {
        res.send(documents);
        client.close();
      }
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      const collection = client.db("redOnion").collection("order");
      collection
        .deleteOne({ _id: ObjectID(req.params.id) })
        .then(function (result) {
          res.send("success");
          client.close();
        });
    }
  });
});

//get order
app.get("/get/order", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("order");
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.send(err);
        client.close();
      } else {
        res.send(documents);
        client.close();
      }
    });
  });
});

//post product to database
app.post("/addItem", (req, res) => {
  const item = req.body;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("item");
    collection.insertOne(item, (err, result) => {
      if (err) {
        console.log(err);
        client.close();
      } else {
        res.send("success");
        client.close();
      }
    });
  });
});

app.post("/order", (req, res) => {
  const item = req.body;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const collection = client.db("redOnion").collection("order");
    collection.insertOne(item, (err, result) => {
      if (err) {
        console.log(err);
        client.close();
      } else {
        res.send("success");
        client.close();
      }
    });
  });
});
//port running
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

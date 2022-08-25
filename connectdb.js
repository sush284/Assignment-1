import express from "express";
import { MongoClient } from "mongodb";
const uri ={""};
 const client = new MongoClient(uri, {});

var app = express();
const PORT = 9191;
app.use(express.json());
app.use(express.urlencoded());

//ESTABLISHING CONNECTION
client.connect((err) => {
  if (err) {
    console.log(err);
  } else console.log("CONNECTED TO DB");
});
const db = client.db("test");
client.close();

//CONNECT TO DB AND GET DATA FROM DB
app.get("/getFood", async (req, res) => {
  //get data from cloud
  const foods = await db.collection("food").find({}).toArray();
  //   console.log(req.query);
  res.send({
    status: 200,
    data: foods,
  });
});

// app.post("/addFood", async (req, res) => {

//   console.log(req.body);
//   const foods = await db.collection('food').find({}).toArray();
// //   console.log(req.query);
//   res.send({
//     status: 200,
//     data: foods,
//     message:"All is well"
//   });
// });

//-----------------------Get Data From UI------------------------
app.post("/getDataFromUI", async (req, res) => {
  //get data from cloud
  console.log(req.body);
  const postDataToMongo = await db
    .collection("food")
    .insertOne({ ...req.body });
  console.log(postDataToMongo);
  res.send({
    status: 200,
    data: postDataToMongo,
    message: "All is not well",
  });
});

//-------------------------Get Users Data------------------------
app.get("/getUsers", async (req, res) => {
  //get data from cloud
  const users = await db.collection("users").find({}).toArray();
  //   console.log(req.query);
  res.send({
    status: 200,
    data: users,
  });
});
//call a  server and listen
app.listen(PORT, function (err) {
  if (err) console.error(err);
  console.log("Server is running on port" + PORT);
});

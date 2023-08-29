require('dotenv').config();
const express = require('express');
const app = express();
const userModel = require('./src/models');
const startDatabase = require('./db');

app.use(express.json());
app.post('/', async (req, res) => {
  const user = new userModel(req.body);
  try {
    //update
    // await userModel.updateOne({name: req.body.name},{age: req.body.age});
    // const a = await userModel.findOne({name: req.body.name})
    // res.send(a)

    //Add
    const users = await userModel.findOne({ name: req.body.name },{ '_id':0,'v':0 });//the second parameter says that dont show these two parameters
    console.log(users);
    if (users) {
      res.status(401).send({message: "Usralready present"})
    }else {
      const a = await user.save();
      // console.log(a)
      res.send(user);
    }

    //Add
    // const modelInstance = await userModel.create({
    //   name: req.body.name,
    //   age:req.body.age
    // })
    // const a = await modelInstance.save()
    // res.send(a)
  } catch (error) {
    res.status(500).send(error);
  }
})

app.get("/users", async (req, res) => {
  const users = await userModel.find({});
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function startServer() {
  try {
    await startDatabase();
    app.listen(5000, () => {
      console.log('Port listening at port 6000')
    })
  } catch (error) {
    console.log(error)
  }
}

startServer();

//Upsert is important
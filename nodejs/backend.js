const express = require('express');
const app = express();
const mongoose = require('mongoose');

// CORS (Cross-Origin Resource Sharing) is a security mechanism that restricts web
// pages or applications from making requests to a different domain than the one
// that served the web page. This is a security measure to prevent malicious code
// on one website from accessing data on another website without permission.
const cors = require('cors');
app.use(cors());

// you need to make sure that you're parsing the request body correctly.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('strictQuery', false);

//setting up api that connect this application to mongodb atlas
mongoose.connect('mongodb+srv://vikram:Markiv@cluster0.akbvhq4.mongodb.net', {
  dbName: 'nodedatabase',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//will execute once the connection is successful
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const studentSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  rollno: { type: Number },
  gender: { type: String },
});

//nodecollection is collection name inside nodedatabase database
const Student = mongoose.model('nodecollection', studentSchema);

// register a new student
app.post('/register', (req, res) => {
  //extracting req.body attributes
  const username = req.body.username;
  const password = req.body.password;
  const rollno = req.body.rollno;
  const gender = req.body.gender;

  //adding in the schema defined above
  const newStudent = new Student({
    username,
    password,
    rollno,
    gender,
  });

  //saving in database name nodedatabase
  newStudent.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error registering student');
    } else {
      console.log('New student added');
      res.status(200).send(newStudent);
    }
  });
});

//will help in displaying the info about user
app.get('/display', (req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(students);
    }
  });
});

//to check login credentials
app.post('/login', async (req, res) => {
  const user = await Student.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Username or password is incorrect');

  if (req.body.password != user.password)
    return res.status(400).send('Email or password is incorrect');
  // console.log(user);
  //will send the user information
  //to the front end
  return res.send(user);
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});

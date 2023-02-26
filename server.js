const express = require('express');
const app = express();
let alert = require('alert'); 



app.get('/', (req, res) => {
    
      res.sendFile(__dirname + "/Register.html");
  });
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })




const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/Css'));
app.use(express.static(__dirname + '/Js'));

const bcrypt = require ('bcryptjs');
const { append } = require("express/lib/response");
const { Int32 } = require('mongodb');
const saltRounds = 10;


mongoose.connect('mongodb+srv://jashan1995:Khushman@cluster0.wb8mi.mongodb.net/User_Info', { useNewUrlParser: true, useUnifiedTopology: true });



const Schema = mongoose.Schema;


const userSchema = new Schema (
    {
      username: { type: String, required: true, unique: true},
      password: {type: String, required: true },
      joined: {type: Date, default: Date.now },
      resetLink: {
        data: String,
        default:  ''
      }
    }
);

const User = mongoose.model('User', userSchema);





const AssignmentInfo = new Schema (
  {
    name: { type: String, required: true },
    studentnum: {type: Number, required: true },
    deadline: {type: Date, default: Date.now },
    level: { type: String, required: true},
    totalcount: {type: Number, required: true},
    contactnum: {type: Number, required: true},
    subject: {type: String, required: true},
    assignment:
    {
      file: { type: Buffer, required: true }

    },

    comments: {type: String}

  }
);



const AssignmentDetail = mongoose.model('AssignmentDetail', AssignmentInfo);
app.get('/Assignment_Details', function (req, res) {

  res.sendFile(__dirname + "/Assignment_Details.html");
  
});

app.get('/', function (req, res) {

  res.sendFile(__dirname + "/Register.html");
  
});


app.get('/Login', function (req, res) {

  res.sendFile(__dirname + "/Login.html");
  
});

app.get('/About', function (req, res) {

  res.sendFile(__dirname + "/About.html");
  
});

app.get('/Contact', function (req, res) {

  res.sendFile(__dirname + "/Contact.html");
  
});

app.get('/Register', function (req, res) {

  res.sendFile(__dirname + "/Register.html");
  
});

app.get('/Password_Reset', function (req, res) {

  res.sendFile(__dirname + "/Password_Reset.html");
  
});

app.get('/Checkout', function (req, res) {

  res.sendFile(__dirname + "/Checkout.html");
  
});


app.post('/Checkout', async function (req, res) {

  try {

   
  let insertData = new AssignmentDetail({

    name: req.body.Name,
    studentnum: req.body.StudentNum,
    deadline: req.body.Deadline,
    level: req.body.Academic,
    totalcount: req.body.TotalAssignments,
    contactnum: req.body.Contact,
    subject: req.body.Subjects ,
    assignment:
    {
      file: req.body.FileUpload,

    },
    comments: req.body.Comments
    }); 

    insertData.save();
    res.sendFile(__dirname + "/Checkout.html"); 


  }
  catch(error) {

    
    res.status(500).send("Internal Server Error");

  }

});


app.post('/Register', async function (req, res) {

  try {


  const hash = await bcrypt.hash(req.body.Password,saltRounds);
   
  let insertUser = new User({
    username: req.body.UserName,
    password: hash
    });
    
    insertUser.save((err,data) => 
    {

      if(err) {
        res.sendFile(__dirname + "/AlreadyRegistered.html");
      }
      else {
        res.sendFile(__dirname + "/Register.html");
      }

    })
    
  }
  catch(error) {

    
    res.status(500).send("Internal Server Error");

  }

});

app.post('/Password_Reset', async (req,res) => {

  const Existinguser = await User.findOne({username:req.body.EnteredUser});

  if(Existinguser == null)
  {
    
    res.sendFile(__dirname + "/NotUserexists.html");
  }


  else
  {

   
    res.sendFile(__dirname + "/Login.html");
  }

});



app.post('/Assignment_Details', async (req,res) => {

  try 
{

  const user = await User.findOne({username:req.body.Email});

  if(user) 
  {
    
    const matchFound = await bcrypt.compare(req.body.Password,user.password);
    
    
    if(matchFound) 
    {
    
      res.sendFile(__dirname + "/Assignment_Details.html");
    }
    else
    {
      
      alert("Wrong username or passwor");
      res.sendFile(__dirname + "/Login.html");
     
    }
  }
  else 
  {
   
    res.send("Wrong username or password");
  }
}

catch(error) {
  
  
  res.status(500).send("Internal Server Error");

}

}); 












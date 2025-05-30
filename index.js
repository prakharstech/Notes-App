require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const notesModel = require('./models/notesinfo');
const userModel = require('./models/user')
const upload = require('./utils/multerconfig');
const uploadToCloudinary = require('./utils/uploadCloudinary');
const fs = require('fs');
const { fileLoader } = require('ejs');
const { log } = require('console');
const PORT = process.env.PORT || 3000;
console.log("📦 MONGODB_URI =", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

function noCache(req, res, next) {
    res.set('Cache-Control', 'no-store');
    next();
};

app.get("/", (req,res)=>{
    res.render("login");
})


app.post("/login",async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(!user) return res.send("Invalid Credentials");

    bcrypt.compare(req.body.password, user.password, (err, result)=>{
        if(result){ 
            let token = jwt.sign({email: user.email},process.env.JWT_SECRET)
            res.cookie("token",token)
            res.redirect("/dashboard");
        }
        else return res.send("Invalid Credentials")
    })
})

app.post("/logout",(req,res)=>{
    res.clearCookie("token")
    res.redirect("/")
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',upload.single('profpic'), async (req,res)=>{
    let {name, email, password} = req.body;
    //let profpic = req.file?.filename;
    if(await userModel.findOne({email:req.body.email})){
        return res.send("User with same email already exists")
    }
    let imageUrl = "https://res.cloudinary.com/dwnc65sca/image/upload/v1748103117/images_kgtazg.jpg"; // fallback

    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'profile_pics');
        imageUrl = result.secure_url;
    }
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
                name,
                email,
                password:hash,
                profpic: imageUrl
            })
            res.redirect("/");
        })
    })
})

app.post("/upload-profile", upload.single('profilePic'), async(req,res)=>{
    let token = req.cookies.token;
    if(!token) return res.redirect('/');
    let decoded = jwt.verify(token,process.env.JWT_SECRET);
    let imageUrl = "https://res.cloudinary.com/dwnc65sca/image/upload/v1748103117/images_kgtazg.jpg";
    if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, 'profile_pics');
        imageUrl = result.secure_url;
    }
    let updatedUser = await userModel.findOneAndUpdate({email: decoded.email},
        {profpic: imageUrl
         },
        {new:true});
        console.log("req.file:", req.file);

        res.redirect('/dashboard');
})

app.get('/dashboard',noCache,async function(req,res){
    let token = req.cookies.token;
    if(!token) return res.redirect('/');
    let decoded = jwt.verify(token,process.env.JWT_SECRET);
    let user = await userModel.findOne({email: decoded.email});
    let notes = await notesModel.find({user: user._id});
    res.render("index",{files:notes || [], user});
});

app.post('/create',async function(req,res){
    let token = req.cookies.token;
    if(!token) return res.redirect('/');
    let decoded = jwt.verify(token,process.env.JWT_SECRET);
    let user = await userModel.findOne({email: decoded.email})
    let {title,details} = req.body;
    let createdNote = await notesModel.create({
        title: title,
        details: details,
        user: user._id
    });
    res.redirect('/dashboard');
});

app.post('/edit/:id',async function(req,res){
    let {title,details} = req.body;
    let updatedNote = await notesModel.findOneAndUpdate({_id:req.params.id},
        {title: title,
         details: details},
        {new:true});
        res.redirect('/dashboard');
});

app.post('/delete/:id',async function(req,res){
    let notes = await notesModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/dashboard');
});

app.get('/files/:id',async function(req,res){
    let note = await notesModel.findById(req.params.id);
    res.render('show',{note});
});

app.get('/edit/:id',async function(req,res){
    let note = await notesModel.findById(req.params.id);
    res.render('edit',{note});
});


/*
    function isLoggedIN(req,res,next){
        let token = req.cookies.token;
        if(!token) return res.redirect('/');
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const notesModel = require('./models/notesinfo');
const fs = require('fs');
const { fileLoader } = require('ejs');
const { log } = require('console');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',async function(req,res){
    let notes = await notesModel.find();
    res.render("index",{files:notes || []});
});

app.post('/create',async function(req,res){
    let {title,details} = req.body;
    let createdNote = await notesModel.create({
        title: title,
        details: details
    });
    res.redirect('/');
});

app.post('/edit/:id',async function(req,res){
    let {title,details} = req.body;
    let updatedNote = await notesModel.findOneAndUpdate({_id:req.params.id},
        {title: title,
         details: details},
        {new:true});
        res.redirect('/');
});

app.post('/delete/:id',async function(req,res){
    let notes = await notesModel.findOneAndDelete({_id:req.params.id});
    res.redirect('/');
});

app.get('/files/:id',async function(req,res){
    let note = await notesModel.findById(req.params.id);
    res.render('show',{note});
});

app.get('/edit/:id',async function(req,res){
    let note = await notesModel.findById(req.params.id);
    res.render('edit',{note});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { fileLoader } = require('ejs');
const { log } = require('console');
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files || []});
    });
});

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.replace(/\s+/g, "_")}.txt`,req.body.details, function(err){
        res.redirect("/");
    });
});

app.post('/edit/:filename',function(req,res){
    fs.rename(`./files/${req.params.filename}`,`./files/${req.body.newname}.txt`,function(err){
        fs.writeFile(`./files/${req.body.newname}.txt`,req.body.newdetails, function(err){
            res.redirect("/");
        });
    });
});

app.post('/delete/:filename',function(req,res){
    fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect('/');
    });
});

app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show',{filename: req.params.filename, filedata: filedata});
    });
});

app.get('/edit/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('edit',{filename:req.params.filename,filedata:filedata});
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
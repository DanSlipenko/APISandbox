const express = require('express');


const fs = require('fs');
const path = require('path');

const PORT = 4001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/notes.html'));
})

app.get('/viewNotes',(req,res)=>{
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData=JSON.parse(data);
        //console.log(dbData)
        res.send(dbData);
    });
});



app.post('/createNote',(req,res)=>{
    console.log(req.body)
    const userNotes = req.body;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData = JSON.parse(data);
        console.log(dbData);
        dbData.push(userNotes);
        stringData = JSON.stringify(dbData);
        console.log(stringData);
        fs.writeFile('db.json',stringData,(err,data)=>{
            if(err)throw err;
        });
    });

    res.send('Create route');
});

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});
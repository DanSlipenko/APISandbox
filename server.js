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

app.get('/cms',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/cms.html'))
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
        let number = 1;
            dbData.forEach((note,index)=>{
                note.id = number;
                number++;
                return dbData;
            });
        stringData = JSON.stringify(dbData);
        console.log(stringData);
        fs.writeFile('db.json',stringData,(err,data)=>{
            if(err)throw err;
        });
    });

    res.send('Create route');
});


app.put('/updateNote/:id',(req,res)=>{
    console.log('Update Route hit')
    console.log(req.params.id)
    console.log(req.body.text);
    var noteId = req.params.id - 1;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData=JSON.parse(data);
        console.log(dbData[noteId])
        var noteSel = dbData[noteId];
        noteSel.text = req.body.text;
        
        //Write updated text to the db.json file
        console.log('Updated note: ' + noteSel.text)
        console.log(dbData[noteId]);
        stringData = JSON.stringify(dbData)
        fs.writeFile('db.json',stringData,(err)=>{
            if(err)throw err;
        })
    });
    res.send('Update Route hit successfully')
})

app.delete('/deleteNote/:id',(req,res)=>{
    var noteId=req.params.id;
    fs.readFile('db.json',(err,data)=>{
        if(err)throw err;
        dbData=JSON.parse(data);
        for(let i=0;i<dbData.length;i++){
            if(dbData[i].id===Number(noteId)){
                dbData.splice([i],1);
            }
        }
        stringData=JSON.stringify(dbData);
        fs.writeFile('db.json',stringData,(err)=>{
            if(err)throw err;
        });
    });
    res.send(`Note number ${noteId} deleted!`)
})

app.listen(PORT,()=>{
    console.log(`App listening at http://localhost:${PORT}`)
});
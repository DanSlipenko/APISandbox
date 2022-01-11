const fs = require('fs');

const objArray = [
    {
        "title":"Seed Note",
        "text":"Seed file has been run",
        "id":1
    }
]

const seedFile = function(){
    stringData = JSON.stringify(objArray);
    fs.writeFile('db.json',stringData,(err)=>{
        if(err)throw err;
        console.log('Seed data inserted')
    })
}

seedFile();
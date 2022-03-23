

console.log('script attached')
//const axios = require('axios');

const homeBtn = document.getElementById('homeBtn');

var theUrl='/viewNotes';

var viewNotes = function(){
    
    fetch('/viewNotes',{
        "method":"GET",
        "headers":{
            'Content-Type': 'application/json'
        }
    })
    .then(
        function(response){
            response.json().then(function(data){
                for(i=0;i<data.length;i++){
                    var noteTitle = data[i].title;
                    
                    var noteText = data[i].text;
                    
                    var noteId = data[i].id;

                    var note = `${noteTitle}: ${noteText}  | id: ${noteId}`
                    //console.log(note);

                    

                    var listItem = document.createElement('LI')
                    var editBtn = document.createElement('button');
                    editBtn.setAttribute('id',`${noteId}`);
                    var delBtn = document.createElement('button')
                    delBtn.setAttribute('id',`${noteId}`);
                    var submitBtn = document.getElementById('submitBtn')
                    var input = document.getElementById('editText')

                    editBtn.innerText = "Edit" 
                    delBtn.innerText = "Delete" 
                    listItem.innerHTML=note;
                    listItem.appendChild(editBtn)
                    listItem.appendChild(delBtn)
                    document.getElementById('myList').appendChild(listItem);

                    editBtn.addEventListener('click',function(event){
                        var selNote = event.target.id;
                        submitBtn.removeAttribute('style');
                        input.removeAttribute('style');
                        submitBtn.addEventListener('click',function(event){
                            event.preventDefault();
                            var apiUrl = `/updateNote/${selNote}`
                            var body = input.value;

                            var xhr = new XMLHttpRequest();
                            xhr.open("PUT", apiUrl, true);
                            xhr.setRequestHeader('Content-Type', 'application/json');
    
                            xhr.send(JSON.stringify({
                              text: body
                            }));
                        })
                    })
                    delBtn.addEventListener('click',function(event){
                        event.preventDefault();
                        var selNote = event.target.id;
                        var apiUrl = `/deleteNote/${selNote}`

                        function deleteFun (){
                            fetch(apiUrl, {
                                "method":"DELETE",
                                "headers":{'Content-Type': 'application/json'}
                            })
                            .then(console.log('Delete succesfull'))
                        }    
                        deleteFun();                    
                    })

                    
                }
            })
        }
    )
    .catch(function(err){
        console.log('Fetch Error', err);
    });
    //return response.json();
}

viewNotes();

// var edBtn =document.getElementById('button');

// edBtn.addEventListener('click',function(){
//     console.log("Button clicked")
// })


// editBtn.addEventListener('click', ()=>{
//     document.getElementById('editText').removeAttribute('style')
//     document.getElementById('submitBtn').removeAttribute('style')
//     console.log(noteId);


// submitBtn.addEventListener('click', (event)=>{
//     event.preventDefault();
//     console.log("Submit was clicked");

//     var xhr = new XMLHttpRequest(text);
//     xhr.open("PUT", '/updateNote/'+ noteId[i], true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
    
//     xhr.send(JSON.stringify({
//         title: noteTitle,
//         text: input.value 
//     }));
    
// })

//api goes below this


//})
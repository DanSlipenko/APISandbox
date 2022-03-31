console.log('script attached')
var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:4001';


var viewNotes = function(){
    axios.get('/viewNotes')
    .then(
        function(response){
            for(let i = 0; i < response.data.length; i++){
                var noteTitle = response.data[i].title;
                var noteText = response.data[i].text;
                var noteId = response.data[i].id;
                var note = `${noteTitle}: ${noteText}  | id: ${noteId}`
                console.log(note)
            }
        }
    )
    .catch(function(err){
        console.log('Fetch Error', err);
    });
}


var updateNote = function(){
    axios.put('/updateNote/2', {
        text: 'Updated Test Note'
    })
    .catch(function(err){
        console.log('Fetch Error', err);
    });
}

var createNote = function(){
    axios.post('/createNote', {
        title: `Note 6`,
        text: "Sixth Note",
        id: 6
    })
    .catch(function(err){
        console.log('Fetch Error', err);
    });
}

//createNote()
//updateNote();
//viewNotes();
var deleteNote = function(){
    axios.delete('/deleteNote/6')
    .then(()=>console.log('Delete successful'))
}
deleteNote()

                // for(i=0;i<response.length;i++){

                //     editBtn.innerText = "Edit" 
                //     delBtn.innerText = "Delete" 
                //     listItem.innerHTML=note;
                //     listItem.appendChild(editBtn)
                //     listItem.appendChild(delBtn)
                //     document.getElementById('myList').appendChild(listItem);

                //     editBtn.addEventListener('click',function(event){
                //         var selNote = event.target.id;
                //         submitBtn.removeAttribute('style');
                //         input.removeAttribute('style');
                //         submitBtn.addEventListener('click',function(event){
                //             event.preventDefault();
                //             var apiUrl = `/updateNote/${selNote}`
                //             var body = input.value;

                //             var xhr = new XMLHttpRequest();
                //             xhr.open("PUT", apiUrl, true);
                //             xhr.setRequestHeader('Content-Type', 'application/json');
    
                //             xhr.send(JSON.stringify({
                //               text: body
                //             }));
                //         })
                //     })
                //     delBtn.addEventListener('click',function(event){
                //         event.preventDefault();
                //         var selNote = event.target.id;
                //         var apiUrl = `/deleteNote/${selNote}`

                //         function deleteFun (){
                //             fetch(apiUrl, {
                //                 "method":"DELETE",
                //                 "headers":{'Content-Type': 'application/json'}
                //             })
                //             .then(console.log('Delete succesfull'))
                //         }    
                //         deleteFun();                    
                //     })

                    
                // }
    


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


console.log('script attached')

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
                    

                    var note = `${noteTitle}: ${noteText} ID: ${noteId}`
                    console.log(note);

                    var editBtn = document.createElement('button');
                    editBtn.innerText='Edit';
                    editBtn.setAttribute('id',`${noteId}`);
                    

                    

                    var listItem = document.createElement('LI')

                    listItem.innerHTML=note;
                    listItem.appendChild(editBtn);

                    document.getElementById('myList').appendChild(listItem);

                    editBtn.addEventListener('click',function(e){
                        console.log(e.target.id)
                        selNote = e.target.id;

                        document.getElementById('editText').removeAttribute('style');
                        document.getElementById('submitBtn').removeAttribute('style');

                        document.getElementById('submitBtn').addEventListener('click',function(e){
                            e.preventDefault();
                            var apiUrl = `/updateNote/${selNote}`
                            var body = document.getElementById('editText').value;
                            console.log(apiUrl + ' ' + body);
                        })
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



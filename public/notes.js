

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
                    

                    var note = `${noteTitle}: ${noteText}`
                    console.log(note);

                    

                    var listItem = document.createElement('LI')

                    listItem.innerHTML=note;

                    document.getElementById('myList').appendChild(listItem);
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



const { default: axios } = require("axios");

describe('Apis',()=>{

    Cypress.config('baseUrl', 'https://jsonplaceholder.typicode.com')

    it('GET', ()=>{
        // axios
        // .get('https://jsonplaceholder.typicode.com/todos', {
        //     params: {
        //         _limit: 5
        //     }
        // })
        // .then(function (res){
        //     expect(res).to.have.property('status', 200);
        //     expect(res.body).to.not.be.null;
        // })

        cy.request('GET', '/todos', {
            params: {
                _limit: 5
            }
        })
        .then((res)=>{
            expect(res).to.have.property('status', 200);
            expect(res.body).to.not.be.null;
        })
        .its('headers').its('via').should('eq', '1.1 vegur')

//---------------------------------

        axios.get('/viewNotes', {
            "headers":{
                'Content-Type': 'application/json'
            }
        })
        .then( function (res) {
            var noteTitle = res.data 


            res.json()
            .then(function(data){
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
            })
        })

//---------------------------------
    })
    it('POST', ()=>{
        cy.request('POST','/todos',{
            title:"New Title",
            completed: false
        })
        .then(res => console.log(res))
        //.catch(err => console.error(err))
        .its('body')
        .its('title').should('eq', 'New Title')
    })
    it('PUT/PATCH', ()=>{
        const item = {
            title: 'Updated',
            completed: true
        }
        cy.request('PUT','/todos/1', item)
        .then(function (res){
            console.log(res)
        })
    })
    it('DELETE', ()=>{
        cy.request('/todos/1')
        .then(res => console.log(res))
        //.catch(err => console.error(err))
    });
})

// GET: https://mysite.com/api/users
// GET: https://mysite.com/api/users/1 or https://mysite.com/api/users/details/1
// POST: https://mysite.com/api/users
// PUT: https://mysite.com/api/users/1 or https://mysite.com/api/users/update/1
// DELETE: https://mysite.com/api/users/1 or https://mysite.com/api/users/delete/1
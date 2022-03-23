console.log('cms.js attached');

var titleEl = document.getElementById('title');
var textEl = document.getElementById('text');
var submit = document.getElementById('submit')

submit.addEventListener('click',function(event){
    event.preventDefault();
    console.log('Submit button clicked');
    console.log(titleEl.value);
    console.log(textEl.value);

    var titleVal = titleEl.value;
    var textVale = textEl.value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/createNote', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: titleVal,
        text: textVale
        
}));
})

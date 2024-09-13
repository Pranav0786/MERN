// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Event Listner
// Add
function EventFunction(){
    console.log('I have clicked on');
}
// Add
document.addEventListener('click',EventFunction)
// Remove
document.removeEventListener('click',EventFunction )


// Event Object
const content = document.querySelector('#wrapper');
content.addEventListener('click' , function(event){
    console.log(event) ;
})

// preventDefault
let links = document.querySelectorAll('a') ;
links.addEventListener('click', function(event){
    event.preventDefault();
    console.log('Maza aaya') ;
});


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

let mydiv = document.createElement('div') ;

function paraStatus(event){
    console.log('Para' + event.target.textContent) ;
}
mydiv.addEventListener('click' , paraStatus);
for( let  i = 0 ; i < 100 ; i++ ){
    let newElement = document.createElement('p') ;
    newElement.textContent = 'This is para' + i ;
    mydiv.appendChild(newElement) ;
}
document.body.appendChild(mydiv) ;

 
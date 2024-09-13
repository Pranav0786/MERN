const countvalue = document.querySelector('#counter') ;

const increment = () => {
    let value = parseInt( countvalue.innerText); // get value from ui
    value = value + 1 ; // update value
    countvalue.innerText = value ; // set value from ui
} ;

const decrement = () => {
    let value = parseInt( countvalue.innerText); // get value from ui
    value = value - 1 ; // update value
    countvalue.innerText = value ; // set value from ui
} ;
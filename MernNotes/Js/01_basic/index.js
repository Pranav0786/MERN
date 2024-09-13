// start
/*
console.log('rahul');
let a = 'babbar' ;
console.log(a) ;
let firstName = 'love' ;
console.log(firstName) ;
firstName = 23 ;
console.log(firstName) ;
*/



// Object
/*
console.log("challooo")
let rectangle = {
    l: 1 ,
    b: 2 ,

    draw: function(){
        console.log('Draw') ;
    }
};
*/


// lang
/*
    ********************************************************************
    Camelcase -> numberOfStudents
    Pascal -> first letter is capital NumberOfStudents
*/


// factory function
/*
function createRectangle(len , bre){
    return rectangle = {
        l: len ,
        b: bre ,
        draw: function(){
            console.log('Rohit') ;
        }
    };
}
let rectangleObj1 = createRectangle(10,5) ;
console.log(rectangleObj1) ;
*/


// constructor function
/*
// initialize/define methods 
function Rectangle(length , breadth){
    this.length = length ;
    this.breadth = breadth ;
    this.draw = function(){
        console.log('Hello Hi') ;
    } 
}
let rectObj = new Rectangle(10,5) ; 
console.log(rectObj) ;
rectObj.color = 'yello' ;
console.log(rectObj) ;
delete rectObj.color ;
*/

// primitive -> make copy
/*
let a = 10 ;
let b = a ;
a++ ;
console.log(a) ;
console.log(b) ;
*/


// Refernce types -> pass refernces
/*
let a = {value : 10 } ;
let b = a ;
a.value++ ;
console.log(a.value) ;
console.log(b.value) ;
*/


// loops
/*
let rectangle = {
    length : 12,
    breadth : 10
};
// for-in loop
for( let key in rectangle ){
    console.log(key , rectangle[key]) ;
}
if('color' in rectangle){
    console.log('Present') ;
}
else{
    console.log('Absent') ;
}

// for-of loop   -> only on arrays maps
for( let key of Object.keys(rectangle)){
    console.log(key) ;
}
*/



// Objrct Cloning
/*
let src = {
    a: 10 ,
    b: 20 ,
    c: 30 
};

// A. Iteration
// let dest = {} ;
// for( let key in src ){
//     dest[key] = src[key] ;
// }
// console.log(dest) ;

// B. Assign
// let dest = Object.assign({},src) ;
// console.log(dest) ;

// C. Spread
let dest = {...src} ;
console.log(dest) ;
*/



// String
/*
let a = 'Arohi' ; // string
let b = new String(a) ; // object

let message = 'This is my first message' ;
let words = message.split(' ') ;
console.log(words) ;

// Template Literal
let para = `
This is 
my para.
    "helllo ${a}" 
` ;
console.log(para) ;
*/




// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ------------------------------------- Arrays --------------------------------------------------


// --->> bucket
// let arr = [10,2,3,0,4,7] ;
// console.log(arr) ;
// ---------------------- insertion
/*
arr.push(100) ; // insert at end
arr.unshift(200) ; // insert at begin
arr.splice(4,0, 'Pranav' ); // insert in mid  (index,no. of dele , insert)
console.log(arr) ;
*/
// ---------------------------Searching
/*console.log(arr.indexOf(200)) ;
console.log(arr.indexOf(1000)) ;
console.log(arr.includes(500)) ;
let cources = [
    {no:1 , name:'shivam'},
    {no:2, name:'akash'}
];
console.log(cources) ;
// let course = cources.find(function(course){
//     return course.name == 'akash';
// })
let course = cources.find(course => course.name === 'akash') ;
console.log(course) ;  
*/


// ---------------------removing element
/*
    arr.pop() ; // end pop()
    console.log(arr) ;
    arr.shift() ; // begin  shift()
    console.log(arr) ;
    arr.splice(2,1) ;// index splice(idx,no.of elements to_del)
    console.log(arr) ;
*/


// ---------------- empty array
/*
    let number = [11,2,4,5,5,6] ;
    number.length = 0 ;
    console.log(number) ;
*/

// combinig and slicing array
/*
    let first = [1,2,3,4] ;
    let second = [4,5,6,7] ;
    let combine = first.concat(second) ;
    console.log(combine) ;
    let sliced = combine.slice(2,6) ;
    console.log(sliced) ;
    let sliced2 = combine.slice(3) ;
    console.log(sliced2) ;
    // spread operator
    let first = [1,2,3,4] ;
    let second = [6,5,7] ;
    let combine = [...first , ...second] ;
    console.log(combine) ;
*/

/*
    let arr = [10,20,30,40] ;
    for( let i of arr ){
        console.log(i) ;
    }
    arr.forEach(function(num){
        console.log(num);
    })
*/

// -------------Joining Array
/*
    let arr = [10,20,30,40] ;
    let joined = arr.join(' ') ;
    console.log(joined) ;
*/
// -------------------- split
/*
    let message = "this is my message" ;
    let parts = message.split(' ') ;
    console.log(parts) ;
*/

// ------------- filtering
/*
    let arr = [10,-20,-30,40] ;
    let filtered = arr.filter(function(num){
        return num > 0 ;
    });
    console.log(filtered) ;
*/

// --------------- mapping
/*
    let nums = [7,8,9,4,5,70,46] ;
    let items = nums.map(value=>'Hello ' + value);
    console.log(items) ;
*/



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ----------------------- FUNCTIONS ----------------------------

/*
function walk(){
    console.log("running") ;
}
// Named function Assignment
let stand = function walk(){
    console.log("running") ;
}

// Anonymous function Assignment
let stand2 = function(){
    console.log("running") ;
}

let sum = function summ(){
    let ans = 0 ;
    for( let i of arguments )
        ans = ans + i ; 
    return ans ;
}
console.log( sum(1,2,3,4,5,6,7,8,9) ) ;
*/


// -----------------------getter && setter ---------------------------------------
/*
let person = {
    fname : 'Rohit',
    lname : 'Sharama',
    get fullname(){
        return `${this.fname} ${this.lname}`
    },
    set fullname( full_name ){
        if( typeof full_name !== String ){
            throw new Error("Enter a valid string");
        }
        else{
            let parts = full_name.split(' ') ;
            this.fname = parts[0] ;
            this.lname = parts[1] ;
        }
    }
}
// person.fullname = 'Quinton Dekock';
// console.log(person.fullname) ;

// -------------------- error handling ------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>> try & catch 
try{
    person.fullname = true ;
}
catch(e){
    alert(e)
}
*/


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ----------------------- Reducing Array ----------------------------



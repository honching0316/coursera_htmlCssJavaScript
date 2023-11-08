//Functions are First-Class Data Types
// Functions ARE objects
function multiply(x, y){
    return x * y;
}
// We can also set name-value pairs into function
multiply.version = "v1"
// console.log(multiply.version)
// console.log(multiply.toString())
// console.log(multiply)

// Function factory
function makeMultiplier(multiplier){
    var myFunc = function (x){
        return multiplier * x;
    };
    return myFunc;
}

var multiplyBy3 = makeMultiplier(3);
/*
typeof(multiplyBy3): function
multiplyBy3: ƒ (x){
        return multiplier * x;
}
30

typeof(doubleAll):  function
doubleAll:  ƒ (x){
        return multiplier * x;
}
200
*/
console.log("typeof(multiplyBy3):", typeof(multiplyBy3))
console.log("multiplyBy3:", multiplyBy3)
console.log(multiplyBy3(10))

var doubleAll = makeMultiplier(2);
console.log("typeof(doubleAll): ", typeof(doubleAll));
console.log("doubleAll: ", doubleAll);
console.log(doubleAll(100));


// Passing functions as arguments (actually passing in the reference/address of the func as operation parameter)
function doOperationOn(x, operation){
    return operation(x);
}
/*
15
200
*/
var result = doOperationOn(5, multiplyBy3);
console.log(result);
result = doOperationOn(100, doubleAll);
console.log(result)
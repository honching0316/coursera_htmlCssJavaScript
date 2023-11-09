// console.log(document)
// console.log(document.getElementById("title"))
// console.log(typeof(document))
// console.log(document instanceof Document)

function sayHello(){
    // document - same as window.document since scope chain to get the global context(window object)
    var name = document.getElementById("name").value;
    var message = "<h2> Hello " + name + "!</h2>";

    document
    .getElementById("content")
    .innerHTML = message;

    //strict operator - 1st check same type, 2nd check same value
    if(name==="student"){
        var title = 
            document.querySelector("#title").textContent;

        title+= "& Lovin' it"
        document.querySelector("h1").textContent = title;
    }

}
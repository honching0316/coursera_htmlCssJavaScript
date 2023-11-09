// console.log(document)
// console.log(document.getElementById("title"))
// console.log(typeof(document))
// console.log(document instanceof Document)

/* 
this event = once the webpage is loaded
this function(function(event){...}) will be execute once the event happens
thus we able to put the script tag anywhere we want in the index.html(no longer must stick on buttom)
*/
document.addEventListener("DOMContentLoaded", 
    function(event){
        function sayHello(event){

            console.log(event);
            console.log(this)

            this.textContent = "Said it!"
        
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
        
        document.querySelector("button")
        .addEventListener("click", sayHello);

        document.querySelector("body")
        .addEventListener("mousemove", 
            function(event){
                // console.log(event);
                if(event.shiftKey===true){
                    console.log("x: "+event.clientX);
                    console.log("y: "+event.clientY);
                }
            }
        )

    } // End function(event){..}
)


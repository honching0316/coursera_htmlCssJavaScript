// Event handling - once the page/html is loaded!(meaning we got all html element) before anything else(eg. css, image...)
// we will load this JS file

document.addEventListener("DOMContentLoaded", function(event){
    console.log("DOMContentLoaded, event: ", event);
    // pass in a anonmous callback func
    document.querySelector("button")
    .addEventListener("click", function(event){
        $ajaxUtils
        .sendGetRequest("data/name.txt", 
            function (xhttp){
                /* 
                this function will only be executed when server response to our request/xhttp
                meaning when it pass conditions of handleResponse function
                Thus the responseText will be whatever server returns back to us
                */
                console.log("xhttp: ", xhttp)
                var name = xhttp.responseText;
                document.querySelector("#content")
                .innerHTML = "<h2> Hello "+name+"!</h2>";
            });
    });

    document.querySelector("body").addEventListener("mousemove", function(event){
        if(event.shiftKey==true){
            // console.log("Mousemove, event: ", event);
            // console.log("x: ", event.x);
        }
    });
});

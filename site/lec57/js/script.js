// Event handling - once the page/html is loaded!(meaning we got all html element) before anything else(eg. css, image...)
// we will load this JS file

document.addEventListener("DOMContentLoaded", function(event){
    console.log("DOMContentLoaded, event: ", event);
    // pass in a anonmous callback func
    document.querySelector("button")
    .addEventListener("click", function(event){
        $ajaxUtils
        .sendGetRequest("data/name.json", 
            function (res){
                /* 
                this function will only be executed when server response to our request/xhttp
                meaning when it pass conditions of handleResponse function
                we will convert whatever server returns back to us to JS object, and handle it here (display to html)
                res - it's an JS object
                */
               // printing our the actual JS object is necessary to debug
                console.log("res: ", res, ", typeof: ", typeof(res));
                var message = res.firstName + " " + res.lastName;
                if(res.likesChineseFood){
                    message+=" likes Chinese food";
                }
                else{
                    message+=" doesn't like Chinese food";
                }
                message+=" and uses ";
                message+=res.numberOfDisplays + 1;
                message+=" displays for coding.";

                document.querySelector("#content")
                .innerHTML = "<h2>"+message+"</h2>";
            });
    });

    document.querySelector("body").addEventListener("mousemove", function(event){
        if(event.shiftKey==true){
            // console.log("Mousemove, event: ", event);
            // console.log("x: ", event.x);
        }
    });
});

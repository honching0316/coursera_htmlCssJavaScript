// add the callback func for this event
document.addEventListener("DOMContentLoaded", 
    function (event){
        function loadDoc(){
            var xhttp = new XMLHttpRequest();
            // console.log(this); //window object(global context)
            console.log("first created: ", xhttp, ", type: ", typeof(xhttp));
            /* our custom func should be in onreadystatechange property 
            the func will be executes when the request/xhttp receives response*/
            xhttp.onreadystatechange = function(){
                // console.log("this: ", this);
                if(this.readyState==4 && this.status==200){
                    /* this - actually means our xhttp object*/
                    console.log("this: ", this);
                    console.log("xhttp: ", xhttp)
                    document.querySelector("#demo").innerHTML = this.responseText;
                }
            }
            /* 
            xhttp.open - speicfies the type of the request and the server location
            3rd parameter - asking if async==true, yes
            send - send the request
            */
            xhttp.open("GET", "ajax_info.txt", true);
            xhttp.send();
        }
        
        // whatever within querySelector, treat like css selector
        window.document.querySelector("button")
            .addEventListener("click", loadDoc);
    }
);


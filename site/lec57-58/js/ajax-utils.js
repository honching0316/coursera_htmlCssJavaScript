// IIFEs - once in the html we reach this file, this function will be executed immediately
(function(global){

    // namespace(object) for our utility
    var ajaxUtils = {}

    // Makes an ajax Get request to "requestURL"
    ajaxUtils.sendGetRequest =
        function(requestUrl, responseHandler, isJsonResponse){
            // new XMLHttpRequest() creates an object to interact with the server
            var xhttp = new XMLHttpRequest();
            // assign func to this property, the func will be executed once we get response from server
            xhttp.onreadystatechange = 
                function(){
                    /* 
                    reason why not assign this func directly to onreadystatechange property
                    instead, we having a outer func
                    since we can't pass in parameters directly, since if we do, then the function will be executed right away
                    we only want to pass in the func value not execute the func
                    so having the outer callback func
                    */
                    handleResponse(xhttp, responseHandler, isJsonResponse);
                };
            // async = true
            xhttp.open("GET", requestUrl, true);
            xhttp.send(null); // for POST only, if Get request just pass in "null"
        };
    
    function handleResponse(xhttp, responseHandler, isJsonResponse){
        if((xhttp.readyState==4) && (xhttp.status==200)){
            // Default isJsonResponse = true
            if(isJsonResponse==undefined){
                isJsonResponse=true;
            }
            // instead of passing in the xhttp/request object, we passing in an JS object(converted from JSON string)
            if(isJsonResponse){
                // if it's a JSON string, convert it to JS object pass into our responseHandler
                responseHandler(JSON.parse(xhttp.responseText));
            }
            else{
                // already a JS object
                responseHandler(xhttp.responseText)
            }
        }
    }

    // Expose utility to the global object/context
    global.$ajaxUtils = ajaxUtils;

})(window);
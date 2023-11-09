// IIFEs - once in the html we reach this file, this function will be executed immediately
(function(global){

    // namespace(object) for our utility
    var ajaxUtils = {}

    // Makes an ajax Get request to "requestURL"
    ajaxUtils.sendGetRequest =
        function(requestUrl, responseHandler){
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
                    handleResponse(xhttp, responseHandler);
                };
            xhttp.open("GET", requestUrl, true);
            xhttp.send(null); // for POST only, if Get request just pass in "null"
        };
    
    function handleResponse(xhttp, responseHandler){
        if((xhttp.readyState==4) && (xhttp.status==200)){
            responseHandler(xhttp);
        }
    }

    // Expose utility to the global object/context
    global.$ajaxUtils = ajaxUtils;

})(window);
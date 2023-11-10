$(
    function (event){    //Same as document.addEventListener("DOMOContentLoaded" ...
        console.log("DOMOContentLoaded, event: ", event);

        //Same as document.querySelector("#navbarToggle").addEventListener("blur", ..
        // $("#navbarToggle").blur(
        //     function (event){
        //         console.log("blur, event: ", event);
        //         var screenwidth = window.innerWidth;
        //         if(screenwidth<768){
        //             $("#collapsable-nav").collapse('hide');
        //         }
        //     }
        // );
        document.querySelector("#navbarToggle").addEventListener("blur", 
            function(event){
                console.log("blur, event: ", event);
                var screenwidth = window.innerWidth;
                if(screenwidth<768){
                    $("#collapsable-nav").collapse('hide');
                }
            }
        );

        // In Firefox and Safari, the click event doesn't retain the focus
        // on the clicked button. Therefore, the blur event will not fire on
        // user clicking somewhere else in the page and the blur event handler
        // which is set up above will not be called.
        // Refer to issue #28 in the repo.
        // Solution: force focus on the element that the click event fired on
        $("#navbarToggle").click(function (event) {
            $(event.target).focus();
        });

    }
);


/*IIFE - once reach this file, this func will be executed immediately*/
(function (global){

    var dc={};

    var homeHTML = "snippets/home-snippet.html"

    // Convenience function for inserting innerHTML for the 'selected elem'
    var insertHtml = function (selector, html){
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    }

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function(selector){
        var html = "<div class='text-center'>"
        html+= "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // On page load (before images or css)
    document.addEventListener("DOMContentLoaded", 
        function(event){
            // On first load, show home view
            showLoading("#main-content");
            $ajaxUtils.sendGetRequest(
                homeHTML,
                function(responseText){
                    document.querySelector("#main-content")
                    .innerHTML = responseText;
                },
                false
            );
        }
    );

    global.$dc = dc;

})(window);

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

    var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
    var categoriesTitleHtml = "snippets/categories-title-snippet.html";
    var categoryHtml = "snippets/category-snippet.html";

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

    /*
    Return substitute of '{{propName}}'
    with propValue in given 'string'
    in our case, the string can be category-snippet.html, property Name be short_name, or name, property Value be the actual short name and name of a category
    */
    var insertProperty = function (string, propName, propValue){
        var propToReplace = "{{"+propName+"}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
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

    // Load the menu categories view,onclick
    dc.loadMenuCategories = function(){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML, true);
    };

    // Builds HTML for the categories page based on the data
    // from the server
    function buildAndShowCategoriesHTML(categories){
        console.log("categories(string return from firebase server): ", categories);
        // Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            categoriesTitleHtml,
            function(categoriesTitleHtml){
                console.log("categoriesTitleHtml from server response: ", categoriesTitleHtml);
                // Retrieve single category snippet
                $ajaxUtils.sendGetRequest(
                    categoryHtml,
                    function(categoryHtml){
                        var categoriesViewHtml = buildCategoriesViewHtml(
                            categories,
                            categoriesTitleHtml,
                            categoryHtml
                        );
                        insertHtml("#main-content", categoriesViewHtml);
                    },
                    false
                );
            },
            false
        );
    }

    // Using categories data and snippets html
    // build categories view HTML to be inserted into page
    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml){
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";
        //loop over the categories(array)
        for(var i=0; i<categories.length; i++){
            var html=categoryHtml //copy value since primitive type of string
            var name = ""+categories[i].name;
            var short_name = categories[i].short_name;
            // console.log("name: ", name);
            // console.log("short name: ", short_name);
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            console.log("html for each category: ", html);
            finalHtml += html;
        }

        finalHtml+= "</section>"
        console.log("final html: ", finalHtml);
        return finalHtml;
    }


    global.$dc = dc;

})(window);

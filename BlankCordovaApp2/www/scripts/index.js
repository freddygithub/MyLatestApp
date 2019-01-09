// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById("btn1").addEventListener("click", addItem2);
        document.getElementById("mySidenav").addEventListener("click", closeNav);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function myFunction2() {
        //getElementsByClassName("dropdown-content").classList.toggle("show");
        document.getElementById("demo").innerHTML = "New text!";

        var _names = document.getElementsByClassName("dropdown-content");

        for (var i = 0; i < _names.length; i++) {
            _names[i].classList.toggle("show");
        }
    };

    function myFunction3() {
        document.getElementById("myDropdown").classList.remove("show");
    };

    function myFunction() {
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn')) {

                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    };

    function addItem2() {
        var person = prompt("Enter a Task:", "");

        if (person != "" || person != null)
            adding(person);

        var class_names = document.getElementsByClassName("dropbtn");

        for (var i = 0; i < class_names.length; i++) {
            class_names[i].addEventListener('click', myFunction2);
        }

        var class_names2 = document.getElementsByClassName("closebtn");

        for (var i = 0; i < class_names.length; i++) {
            class_names2[i].addEventListener('click', myFunction3);
        }
    };

    function adding(text) {
        $("#myUL1 ul").append('<li id= "list" ><div id="mySidenav" class="sidenav"><a href="javascript:void(0)" class="closebtn" onclick= "closeNav()" >&times;</a > <h1>Move to:</h1><button class="button button5">In Progress</button><button class="button button5">Done</button><button class="button button5">Delete</button></div><span class="sp1" onclick="openNav()">&#x25BC;</span>' + text + '</li >');
    };

    function addingToProgress (text) {
        $("#myUL2 ul").append('<li>'+text+'< br /><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%">50% Complete</div></div></li >');
    };

    function deleteText() {
        var classname = document.getElementByClassName("sp1");
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener("click", openNav);
        }
    };
    
})();

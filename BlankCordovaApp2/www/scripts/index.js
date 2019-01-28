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
        document.getElementById("google btn").addEventListener("click", sign);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
    };

    //------------
    var Auth0 = require('auth0-js');
    var Auth0Cordova = require('@auth0/cordova');

    function getAllBySelector(arg) {
        return document.querySelectorAll(arg);
    }

    function getBySelector(arg) {
        return document.querySelector(arg);
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function getAllByClassName(className) {
        return document.getElementsByClassName(className);
    }

    function App() {
        this.auth0 = new Auth0.Authentication({
            domain: 'YOUR_AUTH0_DOMAIN',
            clientID: 'YOUR_CLIENT_ID'
        });
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    App.prototype.state = {
        authenticated: false,
        accessToken: false,
        currentRoute: '/',
        routes: {
            '/': {
                id: 'loading',
                onMount: function (page) {
                    if (this.state.authenticated === true) {
                        return this.redirectTo('/home');
                    }
                    return this.redirectTo('/login');
                }
            },
            '/login': {
                id: 'login',
                onMount: function (page) {
                    if (this.state.authenticated === true) {
                        return this.redirectTo('/home');
                    }
                    var loginButton = page.querySelector('.btn-login');
                    loginButton.addEventListener('click', this.login);
                }
            },
            '/home': {
                id: 'profile',
                onMount: function (page) {
                    if (this.state.authenticated === false) {
                        return this.redirectTo('/login');
                    }
                    var logoutButton = page.querySelector('.btn-logout');
                    var avatar = page.querySelector('#avatar');
                    var profileCodeContainer = page.querySelector('.profile-json');
                    logoutButton.addEventListener('click', this.logout);
                    this.loadProfile(function (err, profile) {
                        if (err) {
                            profileCodeContainer.textContent = 'Error ' + err.message;
                        }
                        profileCodeContainer.textContent = JSON.stringify(profile, null, 4);
                        avatar.src = profile.picture;
                    });
                }
            }
        }
    };

    App.prototype.run = function (id) {
        this.container = getBySelector(id);
        this.resumeApp();
    };

    App.prototype.loadProfile = function (cb) {
        this.auth0.userInfo(this.state.accessToken, cb);
    };

    App.prototype.login = function (e) {
        e.target.disabled = true;

        var client = new Auth0Cordova({
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_CLIENT_ID',
            packageIdentifier: 'YOUR_PACKAGE_ID' // found in config.xml
        });

        var options = {
            scope: 'openid profile',
            audience: 'https://YOUR_AUTH0_DOMAIN/userinfo'
        };
        var self = this;
        client.authorize(options, function (err, authResult) {
            if (err) {
                console.log(err);
                return (e.target.disabled = false);
            }
            localStorage.setItem('access_token', authResult.accessToken);
            self.resumeApp();
        });
    };

    App.prototype.logout = function (e) {
        localStorage.removeItem('access_token');
        this.resumeApp();
    };

    App.prototype.redirectTo = function (route) {
        if (!this.state.routes[route]) {
            throw new Error('Unknown route ' + route + '.');
        }
        this.state.currentRoute = route;
        this.render();
    };

    App.prototype.resumeApp = function () {
        var accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            this.state.authenticated = true;
            this.state.accessToken = accessToken;
        } else {
            this.state.authenticated = false;
            this.state.accessToken = null;
        }

        this.render();
    };

    App.prototype.render = function () {
        var currRoute = this.state.routes[this.state.currentRoute];
        var currRouteEl = getById(currRoute.id);
        var element = document.importNode(currRouteEl.content, true);
        this.container.innerHTML = '';
        this.container.appendChild(element);
        currRoute.onMount.call(this, this.container);
    };

    module.exports = App;
    //------------

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

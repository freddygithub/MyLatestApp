// app.js

window.addEventListener('load', function () {
    var idToken;
    var accessToken;
    var expiresAt;

    var webAuth = new auth0.WebAuth({
        domain: 'roommates.auth0.com',
        clientID: 'seFUeLqcZErH0aGdSQY2l7lWKgfYkVWP',
        responseType: 'token id_token',
        scope: 'openid',
        redirectUri: window.location.href
    });

    var loginBtn = document.getElementById('btn-login');

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

});
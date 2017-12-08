/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'dsw1.auth0.com',
    clientID: 'AfNpZfodfbwnOgYrDVgV6CrlrhNKLA4B',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://dsw1.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
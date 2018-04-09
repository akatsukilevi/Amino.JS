//Libary Imports
const request = require('request-promise'); //The Request Module for sending the different Modules
const endpoints = require('../endpoints.js'); //For Creating shorter URL's in this Module
const { setConfig } = require('../index');

/**
* Loginfunction for the Framework for Handeling API Reqeusts.
* @param  {String} email Email-Adress for logging in.
* @param  {String} password Password for logging in.
* @param  {UUID} deviceID Siehe mehr unter ('Wiki/Device ID Dump').
* @returns {SecurityString} The Securitystring for authenticating with Amino. (required by all other functions).
*/

module.exports = async function login(email, password, deviceID) {
    let sid;
    if (typeof email != 'string' || typeof password !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }

    if (!deviceID) {
        deviceID = '015051B67B8D59D0A86E0F4A78F47367B749357048DD5F23DF275F05016B74605AAB0D7A6127287D9C';
    }

    try {
        const response = await request.post(endpoints.login, {
            json: {
                'email': email,
                'secret': '0 ' + password,
                'deviceID': deviceID,
                'clientType': 100,
                'action': 'normal',
                'timestamp': new Date().getUTCMilliseconds()
            }
        });
        if (!response.sid) throw 'Login Error: SID is not defined.' + response;
        sid = response.sid;
        setConfig('sid', sid);
    }
    catch (err) {
        throw 'Error while calling Login: ' + err;
    }
    return sid;
};
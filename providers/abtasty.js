const fetch = require('node-fetch');

const baseUrl = 'https://api.abtasty.com/api';

const bearerToken = 'Y2ExMTJlNjA0NDdjOWMwNjJmMmZhNjA0YzExMGY3ZTU4MTkzMjEyZGM4NjYzNGQ0NGI0ZDEyMTg3OTIzZDM5NA';

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${bearerToken}`
}

const getAccount = (accountId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/core/accounts/${accountId}`, { headers });
        const jsonResponse = await response.json();
        return resolve(jsonResponse);
    });
}

const getTests = (accountId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/core/accounts/${accountId}/tests`, { headers });
        const jsonResponse = await response.json();
        return resolve(jsonResponse);
    });
}

const getTest = (accountId, testId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/todos`);
        const jsonResponse = await response.json();
        return resolve(jsonResponse);
    });
}


module.exports = { getAccount, getTests, getTest } 
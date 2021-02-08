const baseUrl = 'https://api.trello.com';
const fetch = require('node-fetch');

const key = "e478e9b2b63fff839170a52eb5ad9c22";
const token = '0167c0ef4cce10cdfd15f300660144016829f544f29e9c4c326c59bb53be3890';

const header = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fr;q=0.7,de;q=0.6",
    "authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4NSwiZXhwIjoxNjEzNDAxODE3fQ.3gXNSJIeEKCMjHOc0fL6-oOBvTTpTW0PbNRBY5gJIH8",
    "if-none-match": "W/\"c8acf9b82ac51b1c97b21167c8be5a04\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
}


const getClient = (clientId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`https://broggl-back-lb5a3zm7ta-ew.a.run.app/entries-details-v2/?client_id=${clientId}`, { header, method: 'GET' })
        const jsonResponse = await response.json()
        return resolve(jsonResponse)
    });
}
module.exports = { getClient } 
const baseUrl = 'https://api.trello.com';
const fetch = require('node-fetch');

const key = "e478e9b2b63fff839170a52eb5ad9c22";
const token = '0167c0ef4cce10cdfd15f300660144016829f544f29e9c4c326c59bb53be3890';

const getBoard = (boardId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/1/boards/${boardId}?key=${key}&token=${token}`, { method: 'GET' })
        const jsonResponse = await response.json()
        return resolve(jsonResponse)
    });
}

const getCards = (boardId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/1/boards/${boardId}/cards?key=${key}&token=${token}`, { method: 'GET' })
        const jsonResponse = await response.json()
        return resolve(jsonResponse)
    });
}

const getCard = (cardId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/1/cards/${cardId}?key=${key}&token=${token}`, { method: 'GET' })
        const jsonResponse = await response.json()
        return resolve(jsonResponse)
    });
}

const getMembers = (boardId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/1/boards/${boardId}/members?key=${key}&token=${token}`, { method: 'GET' })
        const jsonResponse = await response.json()
        return resolve(jsonResponse)
    });
}

const getMember = (memberId) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl}/1/members/${memberId}?key=${key}&token=${token}`, { method: 'GET' })
        const jsonResponse = await response.json()
        return resolve(jsonResponse)
    });
}

module.exports = { getBoard, getCards, getCard, getMembers, getMember } 
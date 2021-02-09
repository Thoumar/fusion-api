var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');

var schema = buildSchema(`
    scalar JSON
    scalar JSONObject

    type AbtastyProvider {
        account(accountId: String!): JSONObject,
        tests(accountId: String!): JSONObject,
        test(accountId: String!): JSONObject,
    }
    
    type TrelloProvider {
        board(boardId: String!): JSONObject,
        cards(boardId: String!): JSONObject,
        card(cardId: String!): JSONObject,
        members(boardId: String!): JSONObject,
        member(memberId: String!): JSONObject,
    }
    
    type BrogglProvider {
        entries(clientId: String!): JSONObject,
    }

    type Query {
        abtasty: AbtastyProvider,
        trello: TrelloProvider,
        broggl: BrogglProvider
    }
`);

const abtastyProvider = require('./providers/abtasty');
const trelloProvider = require('./providers/trello');
const brogglProvider = require('./providers/broggl');

var root = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    abtasty: () => {
        return {
            tests: ({ accountId }) => abtastyProvider.getTests(accountId),      // Implemented
            account: ({ accountId }) => abtastyProvider.getAccount(accountId),  // Todo: 403 Not permittted
            test: () => abtastyProvider.getTest(accountId)                      // Todo: to test
        }
    },
    trello: () => {
        return {
            board: ({ boardId }) => trelloProvider.getBoard(boardId),           // Implemented
            cards: ({ boardId }) => trelloProvider.getCards(boardId),           // Implemented
            card: ({ cardId }) => trelloProvider.getCard(cardId),               // Implemented
            members: ({ boardId }) => trelloProvider.getMembers(boardId),       // Implemented
            member: ({ memberId }) => trelloProvider.getMember(memberId),       // Implemented
        }
    },
    broggl: () => {
        return {
            client: ({ clientId }) => brogglProvider.getClient(clientId),       // Implemented
        }
    }
};

var app = express();

app.use('/fusion', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/fusion');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');

var schema = buildSchema(`
    scalar JSON 

    type AbtastyProvider {
        account(accountId: String!): JSON,
        tests(accountId: String!): JSON,
        test(accountId: Int!): JSON,
    }
    
    type TrelloProvider {
        board(boardId: String!): JSON,
        cards(boardId: String!): JSON,
        card(cardId: String!): JSON,
        members(boardId: String!): JSON,
        member(memberId: String!): JSON,
    }
    
    type BrogglProvider {
        entries(clientId: String!): JSON,
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
    abtasty: () => {
        return {
            tests: ({ accountId }) => abtastyProvider.getTests(accountId),      // Implemented
            account: ({ accountId }) => abtastyProvider.getAccount(accountId),  // Todo: 403 Not permittted
            test: () => abtastyProvider.getTest(accountId)                      // Implemented
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
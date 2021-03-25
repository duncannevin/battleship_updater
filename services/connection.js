const connections = {};
const log4js = require('log4js');

class Connection {
    constructor(boardId, ws) {
        this.logger = log4js.getLogger(`Connection: ${boardId}`);
        this.boardId = boardId;
        this.ws = ws;

        this.onMessage(this.ws);
        this.onError(this.ws);
        this.onClose(this.ws);

        this.logger.debug(`created`);
    }

    onMessage(ws) {
        ws.on('message', (msg) => {
            this.logger.debug(`message received: ${msg}`);
        });
    }

    onError(ws) {
        ws.on('error', (err) => {
            this.logger.error(`error: ${err}`);
        });
    }

    onClose(ws) {
        ws.on('close', () => {
            this.logger.info(`closed`);
            this.removeSelf();
        });
    }

    removeSelf() {
        this.logger.info(`removed`);
        delete connections[this.boardId];
    }

    sendMessage(data) {
        const stringified = JSON.stringify({ boardId: this.boardId, data });
        this.logger.info(`updated: ${stringified}`);
        this.ws.send(stringified);
    }
}

function pushConnection(boardId, ws) {
    connections[boardId] = new Connection(boardId, ws);
}

function updateConnection(boardId, foo) {
    const connection = connections[boardId];

    if (connection) {
        connections[boardId].sendMessage(foo);
    }
}

module.exports = { pushConnection, updateConnection };

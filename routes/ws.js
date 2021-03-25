const express = require('express');
const router = express.Router();

const { pushConnection } = require('../services/connection');

router.ws('/:boardId', function(ws, req) {
    const { boardId } = req.params;
    pushConnection(boardId, ws);
});

module.exports = router;
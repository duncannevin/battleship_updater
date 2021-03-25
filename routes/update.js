const express = require('express');
const router = express.Router();

const { updateConnection } = require('../services/connection');

router.post('/:boardId', function(req, res) {
    const { boardId } = req.params;
    const { body } = req;
    updateConnection(boardId, body);
    res.send();
});

module.exports = router;

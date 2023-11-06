const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + './public.');
});

router.post('/', (res, res) => {
  res.send();
});

module.exports = router;
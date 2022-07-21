const express = require('express');
const app = require('./app');
const dotenv = require('dotenv');
require('dotenv').config();
const fs = require('fs');

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

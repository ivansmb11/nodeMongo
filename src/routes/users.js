const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('Ingresando a la App');
})

router.get('/users/signup', (req, res) => {
    res.send('Formulario de authentication');
})

module.exports = router;
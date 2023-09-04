// import routes
const authRoute=require('../routes/auth.js');
const pokemonRoute=require('../routes/pokemon.js');
const error = require('../middleware/error.js');
const express= require('express');

module.exports= function(app){
    // route middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/api/auth',authRoute);
    app.use('/api/pokemons',pokemonRoute);
    app.use(error);
};
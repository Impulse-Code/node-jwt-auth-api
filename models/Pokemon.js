const mongoose =require("mongoose");
const Joi = require("joi");
const pokemonSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },

    powers:{
        type:Array,
        default:null,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    desc:{
        type:String,
        required:true,
    },
    category:{
        type:[String],
        enum:['Earth','Fire','Water','Air','Spirit'],
        required:true,
    }
})

const Pokemon =mongoose.model('Pokemon',pokemonSchema)


function validatePokemon(pokemon){
    const schema=Joi.object({
        name:Joi.string(),
        powers:Joi.string(),
        owner:Joi.string(),
        desc:Joi.string(),
        category:Joi.string(),
    });
    return schema.validate(pokemon);
}

module.exports.validatePokemon=validatePokemon;
module.exports.Pokemon=Pokemon;

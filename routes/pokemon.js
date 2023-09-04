const express = require("express");
const router = express.Router();
const { Pokemon, validatePokemon } = require("../models/Pokemon.js");
const verifyAuth = require("../middleware/authMiddleware.js");

// GET SINGLE POKEMON
router.get("/:id", verifyAuth, async (req, res, next) => {
	try {
		const pokemon = await Pokemon.findById(req.params.id).populate(
			"owner",
			"username -_id"
		);
		if (!pokemon)
			return res
				.status(404)
				.json("Sorry the Specified Pokemon could not be found");

		res.status(200).json(pokemon);
	} catch (err) {
		next(err);
	}
});

router.get("/", verifyAuth, async (req, res) => {
	try {
		const pokemons = await Pokemon.find();
		!pokemons &&
			res.statusCode(404).json("Sorry no pokemons were found in the database");
		res.status(200).json(pokemons);
	} catch (err) {}
});
// CREATE A POKEMON
router.post("/", verifyAuth, async (req, res, next) => {
	const { error } = validatePokemon(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	try {
		let pokemon = await Pokemon.findOne({ name: req.body.name });
		if (pokemon)
			return res.status(400).send("Pokemon already registered in the database");

		pokemon = new Pokemon({
			name: req.body.name,
			owner: req.body.owner,
			powers: req.body.powers,
			category: req.body.category,
			desc: req.body.desc,
		});

		await pokemon.save();
		res.status(200).json(pokemon);
	} catch (err) {
		next(err);
	}
});

// UPDATE A POKEMON
router.put("/:id", async (req, res) => {
	try {
		const pokemon = await Pokemon.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).send(pokemon);
	} catch (err) {
		next(err);
	}
});

// DELETE A POKEMON
router.delete("/:id", verifyAuth, async (req, res) => {
	try {
		const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
		!pokemon && res.status(404).json(`Specified Pokemon not found`);

		res.status(200).json(`pokemon ${pokemon.name} has been deleted`);
	} catch (err) {
		next(err);
	}
});

module.exports = router;

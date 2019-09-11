const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../models/dog');

// Endpoints

// index GET /dogs
router.get('/', function(req, res) {
	Dog.find({})
		.then(result => {
			if(result.length)
				res.status(200).send(result);
			else
				res.status(404).send('Who let the dogs out');
		})
		.catch(e => {
			res.status(500).send(e);
		})
});

// create POST /dogs
router.post('/', function(req, res) {
	const body = req.body;
	const newDog = new Dog({
		_id: new mongoose.Types.ObjectId(),
		...body
	})

	newDog.save()
		.then(result => {
			if(result)
				res.status(201).send(result);
			else
				res.status(404).send('Cant create dog');
		})
		.catch(e => {
			res.status(500).send(e);
		})
})

module.exports = router;
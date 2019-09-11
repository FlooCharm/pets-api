const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../models/dog');

// Endpoints

// index GET /dogs
// fetch all dogs
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

// index GET /dogs/:id
// fetch one dogs
router.get('/:id', function(req, res) {
	Dog.findById(req.params.id).exec(console.log('fetching dog... U・ᴥ・U'))
		.then(result => {
			if(result)
				res.status(200).send(result);
			else
				res.status(404).send('Dog not found');
		})
		.catch(e => {
			res.status(500).send('Cant fetch dog');
		})
});

// create POST /dogs
// create dogs
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

//update PUT /dogs/:id
// update one dog
router.put('/:id', function(req, res) {
	let body = req.body;
	Dog.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(console.log('updating dog... U・ᴥ・U'))
		.then(result => {
			if(result)
				res.status(201).send(result);
			else
				res.status(404).send('Cant update, dog is missing');
		})
		.catch(e => {
			res.status(500).send('Cant update dog');
		})
})

// delete DELETE /dogs/:id
// delete one dog
router.delete('/:id', function(req, res) {
	Dog.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).send() )
		.catch(e => res.status(500).send(e) )
});

module.exports = router;
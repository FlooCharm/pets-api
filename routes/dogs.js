const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Dog = require('../models/dog');

// Endpoints

// index GET /dogs
// fetch all dogs
router.get('/', function(req, res, next) {
	Dog.find({})
		.then(result => {
			if(result.length)
				res.status(200).json({
					dogs: result
				});
			else
				res.status(404).json({
					message: 'Who let the dogs out'
				});
		})
		.catch(next)
});

// index GET /dogs/:id
// fetch one dogs
router.get('/:id', function(req, res, next) {
	Dog.findById(req.params.id)
		.then(result => {
			if(result)
				res.status(200).json({
					dog: result
				});
			else
				res.status(404).send('Dog not found');
		})
		.catch(next)
});

// create POST /dogs
// create dogs
router.post('/', function(req, res, next) {
	const body = req.body;
	Dog.create(body)
		.then(result => {
			if(result)
				res.status(201).json({
					dog: result
				});
			else
				res.status(404).send('Cant create dog');
		})
		.catch(next)
})

//update PUT /dogs/:id
// update one dog
router.put('/:id', function(req, res, next) {
	let body = req.body;
	Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(result => {
			if(result)
				res.status(201).json({
					dog: result
				});
			else
				res.status(404).send('Cant update, dog is missing');
		})
		.catch(next)
})

// delete DELETE /dogs/:id
// delete one dog
router.delete('/:id', function(req, res, next) {
	Dog.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).send() )
		.catch(next)
});

module.exports = router;
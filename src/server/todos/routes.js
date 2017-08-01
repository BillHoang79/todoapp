var mongoose = require('mongoose');
var Todo = require('server/db/db').Todo;
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	Todo.find((err, results) => {
		if (err) { console.log(err); }
	
		res.send({ todos: results });
	}); 
});

router.post('/', (req, res) => {
	var todo = new Todo(req.body);
	todo.save(err => {
		if (err) { console.log(err); }

		res.send('Todo Saved')
	});
}); 

router.put('/:id', (req, res) => {
	var id = req.params.id;
	Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
		$set: { task: req.body.task }
	}, err => {
		if (err) { console.log (err); }

		res.send('Todo Updated');
	});
});

router.delete('/:id', (req, res) => {
	var id = req.params.id;
	Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
		if (err) { console.log(err); }
		
		res.send('Todo deleted');
	});
});

module.exports = router; 

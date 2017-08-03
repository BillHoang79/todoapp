var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://todo:todo@ds121483.mlab.com:21483/todoapp'); 

var Todo = mongoose.model('Todo', {
	task: String,
	isCompleted: Boolean,
	isEditing: Boolean
});

module.exports.Todo = Todo;
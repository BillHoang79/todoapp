var todosRoutes = require('server/todos/routes');

module.exports = app => {
	app.use('/todos', todosRoutes);
};
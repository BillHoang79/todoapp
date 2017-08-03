import _ from 'lodash'; 

export default ($scope, todoFactory) => {
	let params = {
		createHasInput: false
	};

	todoFactory.getTasks($scope);

	/*$scope.onCompletedClick = todo => {
		todo.isCompleted = !todo.isCompleted;
	};

	$scope.onEditClick = todo => {
		todo.isEditing = true;
		todo.updatedTask = todo.task;
	};

	$scope.onCancelClick = todo => {
		todo.isEditing = false; 
	}; */

	const 
	{ onCompletedClick,
	  onEditClick,
	  onCancelClick, 
	  createTask, 
	  updateTask, 
	  deleteTask, 
      watchCreateTaskInput } = todoFactory;

	$scope.onCompletedClick = _.partial(onCompletedClick, $scope);
	$scope.onEditClick = _.partial(onEditClick, $scope);
	$scope.onCancelClick = _.partial(onCancelClick, $scope);
	$scope.createTask = _.partial(createTask, $scope, params);
	$scope.updateTask = _.partial(updateTask, $scope);
	$scope.deleteTask = _.partial(deleteTask, $scope);
	$scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
} 


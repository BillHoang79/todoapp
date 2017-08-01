import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {

	let onCompletedClick = ($scope, todo) => {
		todo.isCompleted = !todo.isCompleted;
	}

	/*function onCompletedClick($scope, todo) {
		todo.isCompleted = !todo.isCompleted;
	}*/

	let onEditClick = ($scope, todo) => {
		todo.isEditing = true;
		todo.updatedTask = todo.task;
	}

	let onCancelClick = ($scope, todo) => {
		todo.isEditing = false;
	}

	let getTasks = $scope => {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		}); 
	}

	let createTask = ($scope, params) => {
		if (!$scope.createTaskInput) { return; }

		$http.post('/todos',{
			task: $scope.createTaskInput,
			isCompleted: false,
			isEditing: false
		}).success(response => {
			getTasks($scope);
			$scope.createTaskInput = '';
		});

		//params.createHasInput = false;
		//$scope.createTaskInput = '';
	}

	let updateTask = ($scope, todo) => {
		$http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(response => {
			getTasks($scope);
			todo.isEditing = false;
		});

		//todo.task =  todo.updatedTask;
		//todo.isEditing = false;
	}

	let deleteTask = ($scope, todoToDelete) => {
		$http.delete(`/todos/${todoToDelete._id}`).success(response => {
			getTasks($scope);
		});
		
		//_.remove($scope.todos, todo => todo.task === todoToDelete.task);
	}

	let watchCreateTaskInput = (params, $scope, val) => { 
		const createHasInput = params.createHasInput;

		if (!val && createHasInput) {
			$scope.todos.pop();
			params.createHasInput = false;
		} else if (val && !createHasInput) {
 			$scope.todos.push({ task: val, isCompleted: false });	
 			params.createHasInput = true;
 		} else if  (val && createHasInput) {
 			$scope.todos[$scope.todos.length - 1].task = val;
 		}
	}

	return { 
		onCompletedClick,
		onEditClick,
		onCancelClick,
		getTasks,
		createTask,
		updateTask,
		deleteTask,
		watchCreateTaskInput
	};
});

export default todoFactory;

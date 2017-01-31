$(document).ready(function(){
	var todos = [{
		task : "Going for Jogging",
		isCompleted : true
	},
	{
		task : "Exercise",
		isCompleted : false
	}
	]

	var app = {
		showTodos : function(){
			var todosList = $('#todos-list');
			todosList.html('');
			
			todos.forEach(function(todo){
				var taskClasses = 'todo-task'+(todo.isCompleted ? ' is-completed' : '');
				todosList.append('\
						<tr/>\
							<td class="'+taskClasses + '">'+todo.task+'</td>\
							<td>\
							<button class="edit-button">Edit</button>\
							<button class="delete-button">Delete</button>\
							<button class="save-button">Save</button>\
							<button class="cancel-button">Cancel</button>\
							</td>\
							</tr>'
					);
			})
		},
		enterEditMode : function(){
			var actionCell = $(this).closest('td');
			var taskCell = actionCell.prev();
			
			actionCell.find('.save-button').show();
			actionCell.find('.cancel-button').show();
			actionCell.find('.edit-button').hide();
			actionCell.find('.delete-button').hide();

			taskCell.removeClass('todo-task');
			app.currentTask = taskCell.text();

			taskCell.html('<input class="edit-input" type="text" value="'+app.currentTask+'"/>');
		},
		exitEditMode : function(){
			var actionCell = $(this).closest('td');
			var taskCell = actionCell.prev();
			actionCell.find('.save-button').hide();
			actionCell.find('.cancel-button').hide();
			actionCell.find('.edit-button').show();
			actionCell.find('.delete-button').show();

			taskCell.removeClass('edit-input').
			taskCell.addClass('todo-task').
			taskCell.html(app.currentTask);
		},
		saveTask : function(){
			var newTask = $('.edit-input').val();
			todos.forEach(function(todo){
				if(app.currentTask === todo.task){
					todo.task = newTask;
				}
			});

			app.currentTask = newTask;
			app.exitEditMode.call(this);
			
		},
		deleteTask : function(){
			var taskTodelete = $(this).parent('td').prev().text();
			var found = false;
			todos.forEach(function(todo , index){
				if( !found && todo.task === taskTodelete){
					todos.splice(index , 1);
					found = true;
				}
			});

			app.showTodos();
		},
		toggleTodo : function(){
			
			todos.forEach(function(todo){
				if( todo.task === $(this).text() ){
					todo.isCompleted = !todo.isCompleted;
				}
			}.bind(this));
			app.showTodos();
		},
		addTodo : function(event){
			event.preventDefault();
			var createInput = $('#create-input');
			var createInputValue = createInput.val();
			 
			var errorMessage = null;
			if(!createInputValue){
				errorMessage = "Task cannot be empty";
			}else{
				todos.forEach(function(todo){
					if(todo.task === createInputValue){
						errorMessage = "task already exists";
					}
				});
			}

			if(errorMessage){
				app.showError(errorMessage);
				return;
			}

			todos.push({
				task : createInputValue,
				isCompleted: false
			})
			createInput.val('');
			app.showTodos();
		},
		showError : function(errorMessage){
			$('#error-message').html(errorMessage).slideDown();
		},
		clearError : function(){
			$('#error-message').fadeOut();
		}

	}
	 $('#create-form button').css('background', 'green');
    $('#create-form button').css({
        color: 'white',
        borderRadius: '8px'
    });


	app.showTodos();
	$('table').on('click' , '.edit-button' ,app.enterEditMode);
	$('table').on('click' , '.cancel-button', app.exitEditMode);
	$('table').on('click' , '.save-button', app.saveTask);
	$('table').on('click' , '.delete-button', app.deleteTask);
	$('table').on('click' , '.todo-task' , app.toggleTodo);
	$('#create-form').on('submit' , app.addTodo);
	$('#create-input').on('keyup' , app.clearError);
	// $('table').on('click' , '.save-button', app.exitEditMode);
});
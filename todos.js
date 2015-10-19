Todos = new Mongo.Collection('todos')

if (Meteor.isClient) {

    Template.main.helpers({
        todos: function(){
            return Todos.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.main.events({
        "submit .new-todo": function(event){
            var newText = event.target.newTodo.value;

            Todos.insert({
                text: newText,
                createdAt:  new Date()
            });
            //Clear Form
            event.target.newTodo.value = "";

            //Prevent Submit
            return false;
        }
    });
}

if (Meteor.isServer) {

}

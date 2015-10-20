Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {

    Template.main.helpers({
        todos: function(){
            return Todos.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.main.events({
        "submit .new-todo": function(event){
            var newText = event.target.newTodo.value;
            Meteor.call('addTodo', newText);
            //Clear Form
            event.target.newTodo.value = "";
            //Prevent Submit
            return false;
        },

            "click .toggle-checked": function(){
                Meteor.call('setChecked',this.isChecked,this._id);
            },

            "click .delete-todo": function(){
                    Meteor.call('deleteTodo',this._id);
            }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {

}

//Meteor Methods (can call in Client and/or Server)

Meteor.methods({
    addTodo: function(text) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("Please Log-In");
        } else {
            Todos.insert({
                text: text,
                createdAt: new Date(),
                userId: Meteor.userId(),
                username: Meteor.user().username
            });
        }
    },

    deleteTodo: function(todoId){
        Todos.remove(todoId);
    },

    setChecked: function(status,todoId){
        if (status){
            status=false;
        }else{
            status=true;
        }
        Todos.update(todoId, {$set:{isChecked: status}});
    },

    "click .delete-todo": function(){
        Meteor.call('deleteTodo',this._id);
    }

});


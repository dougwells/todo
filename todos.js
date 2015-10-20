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
            Todos.insert({
                text: newText,
                createdAt:  new Date()
            });
            //Clear Form
            event.target.newTodo.value = "";
            //Prevent Submit
            return false;
        },

            "click .toggle-checked": function(){
                if (this.isChecked){
                    this.isChecked=false;
                }else{
                    this.isChecked=true;
                }
                Todos.update(this._id, {$set:{isChecked: this.isChecked}});
            },

            "click .delete-todo": function(){
                    Todos.remove(this._id);
            }
    });
}

if (Meteor.isServer) {

}

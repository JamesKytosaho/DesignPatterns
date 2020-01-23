const Todo = function (todo) {
    this.id = todo.id;
    this.text = todo.text;
};

Todo.prototype.save = function() {
    console.log("saved todo: ", this.id);
}

module.exports = Todo;

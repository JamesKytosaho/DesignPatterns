const Todo = require("./todo");

const commandService = function () {
    var message = 'Save';
    this.update = function (todo) {
        console.log(`${message} command created for todo ${JSON.stringify(todo)}`);
    }
};

const mediator = {
    channels: {},
    subscribe: function(channel, context, func){
        if (!mediator.channels[channel]) {
            mediator.channels[channel] = []
        }
        mediator.channels[channel].push({
            context: context,
            func: func
        });
    },
    publish: function(channel){
        if (!this.channels[channel]) {
            return false
        }
        
        var args = Array.prototype.slice.call(arguments, 1);
        
        for (var i = 0; i < mediator.channels[channel].length; i++)
        {
            var sub = mediator.channels[channel][i];
            sub.func.apply(sub.context, args)
        }
    },
};

const _commandService = new commandService();
const todo = new Todo({ id: 1, text: "some text for a todo"});

mediator.subscribe("save", _commandService, _commandService.update);

todo.save = function() {
    mediator.publish("save", this);
    Todo.prototype.save.call(this);
};

todo.save();

const todoAggregate = {
    commands: [],
    todos: {},
    addToDo: (payload) => {
        todoAggregate.todos[payload.id] = payload;
    },
    changeIsChecked: (payload) => {
        todoAggregate.todos[payload.id] = payload;
    }, 
};

const executeCommand = (command, aggregate, payload) => {
    const aggregateFunction = aggregate[command];

    if(aggregateFunction && typeof aggregateFunction === "function") {
        todoAggregate.commands.push({
            command,
            payload,
        });

        return aggregateFunction(payload);
    }

    const errorMessage = `No command named ${command} exist`;
    throw errorMessage;
};

executeCommand("addToDo", todoAggregate, {
    id: 1,
    isChecked: false,
});

executeCommand("changeIsChecked", todoAggregate, {
    id: 1,
    isChecked: true,
});

executeCommand("changeIsChecked", todoAggregate, {
    id: 1,
    isChecked: false,
});

executeCommand("changeIsChecked", todoAggregate, {
    id: 1,
    isChecked: true,
});

console.log("executed commands: ", todoAggregate.commands);

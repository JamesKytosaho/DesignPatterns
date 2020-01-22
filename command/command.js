const toDoAggregate = {
    commands: [],
    toDos: {},
    addToDo: (payload) => {
        toDoAggregate.toDos[payload.id] = payload;
    },
    changeIsChecked: (payload) => {
        toDoAggregate.toDos[payload.id] = payload;
    }, 
};

const executeCommand = (command, aggregate, payload) => {
    const aggregateFunction = aggregate[command];

    if(aggregateFunction && typeof aggregateFunction === "function") {
        toDoAggregate.commands.push({
            command,
            payload,
        });

        return aggregateFunction(payload);
    }

    const errorMessage = `No command named ${command} exist`;
    throw errorMessage;
};

executeCommand("addToDo", toDoAggregate, {
    id: 1,
    isChecked: false,
});

executeCommand("changeIsChecked", toDoAggregate, {
    id: 1,
    isChecked: true,
});

executeCommand("changeIsChecked", toDoAggregate, {
    id: 1,
    isChecked: false,
});

executeCommand("changeIsChecked", toDoAggregate, {
    id: 1,
    isChecked: true,
});

console.log("executed commands: ", toDoAggregate.commands);

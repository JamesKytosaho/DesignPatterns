const repo = {
    commands: [],
    toDos: {},
    addToDo: (toDo) => {
        repo.toDos[toDo.id] = toDo;
        console.log(`add toDo with id: ${toDo.id}`);
    },
    changeIsChecked: (toDo) => {
        const {id, isChecked} = toDo;
        
        repo.toDos[id].isChecked = isChecked;
        console.log(`changeIsChecked: `, isChecked);
    }, 
};

repo.execute = function(name) {
    const args = Array.prototype.slice.call(arguments, 1);

    repo.commands.push({
        name: name,
        obj: args[0],
    })

    if (repo[name]) 
        return repo[name].apply(repo, args);
    
    return false;
};


repo.execute("addToDo", {
    id: 1,
    isChecked: false,
});

repo.execute("changeIsChecked", {
    id: 1,
    isChecked: true,
});

repo.execute("changeIsChecked", {
    id: 1,
    isChecked: false,
});

repo.execute("changeIsChecked", {
    id: 1,
    isChecked: true,
});

console.log("executed commands: ", repo.commands);

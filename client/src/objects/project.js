class Project{
    constructor(name){
        if (!Project.idTemp){
            Project.idTemp = 0;
        }
        Project.idTemp++;

        this.id = Project.idTemp;
        this.name = name;
        this.tasks = []
    }
}

export {Project}
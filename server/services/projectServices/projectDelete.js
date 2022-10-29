module.exports = async(projectToDelete)=>{

    const deleteProject = await projectToDelete.delete();
    return deleteProject
}
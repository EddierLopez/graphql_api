import { connection } from "./connection.js";
import { generatedId } from "../utils/id-generator.js";

const taskTable=()=>connection.table('tasks');

export async function getTask(id){
    return await taskTable().first().where({id});
}
export async function getTasks(limit){
    const query=taskTable().select().orderBy('deadline','desc');
    if(limit){
        query.limit(limit);
    }
    return query;
}
export async function createTask({name,deadline,capture,user_id}){
    const task={
        id:generatedId(),
        name,
        deadline,
        capture,
        user_id,
        created_at:new Date().toISOString,
    };
    await taskTable().insert(task);
    return task;
}
export async function updateTask({id,name,deadline,capture}){
    const task=await taskTable().first().where({id});
    if(!task){
        return null;
    }
    const updateFields={name,deadline,capture};
    await taskTable().update(updateFields).where({id});
    return{...task,...updateFields};
}
export async function deleteTask(id){
    const task=await taskTable().first().where({id});
    if(!task){
        return null;
    }
    await taskTable().delete().where({id});
    return task;
}
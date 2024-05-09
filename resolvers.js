import { GraphQLError, subscribe } from "graphql";
import {getTask,getTasks,updateTask,createTask,deleteTask} from './services/tasks.js';
import { getUser } from "./services/users.js";
import {PubSub} from 'graphql-subscriptions';

const pubSub=new PubSub();
export const resolvers={
    Query:{
        user:(_root,{id})=>{

        },
        task:(_root,{id})=>{
            const task=getTask(id);
            if(!task){
                throw new GraphQLError("Tarea no existe",{
                    extensions:{
                        code:'NOT_FOUND',
                    }});
            }
            return task;
        },
        tasks:(_root,{limit})=>{
            const items=getTasks(limit);
            return {items};
        }
    },
    Task:{
        user:async (task)=>{
            return await getUser(task.user_id);
        },
        created_at:(task)=>{
            return task.created_at.slice(0,'yyyy-mm-dd'.length);
        },
    },
    Mutation:{
        createTask:async (_root,{input:{name,deadline,capture}},{auth})=>{
            if(!auth){
                throw new GraphQLError("Usuario no autenticado",{extensions:{code:'UNAUTHORIZED'}});
            }
            const task= await createTask({name,deadline,capture,user_id:auth.sub});
            pubSub.publish('TASK_ADDED',{newTask:task});
            return task;
        },
        updateTask:(_root,{input:{id,name,deadline,capture}},{auth})=>{
            if(!auth){
                throw new GraphQLError("Usuario no autenticado",{extensions:{code:'UNAUTHORIZED'}});
            }
            const task=updateTask(input);
            if(!task){
                throw new GraphQLError("No existe tarea",{extensions:{code:'NOT_FOUND'}});
            }
            return task;
        },
        deleteTask:(_root,{id},{auth})=>{
            if(!auth){
                throw new GraphQLError("Usuario no autenticado",{extensions:{code:'UNAUTHORIZED'}});
            }
            const task=deleteTask(id);
            if(!task){
                throw new GraphQLError("No existe tarea",{extensions:{code:'NOT_FOUND'}});
            }
            return task;
        },

    },
    Subscription:{
        newTask:{
            subscribe:(_, args,{user})=>{
                return pubSub.asyncIterator('TASK_ADDED');
            },
        }
    },
    
}
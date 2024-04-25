import { GraphQLError } from "graphql";
import {getTask,getTasks,updateTask,createTask,deleteTask} from './services/tasks.js';

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
    Mutation:{
        createTask:(_root,{input:{name,deadline,capture}},{auth})=>{
            if(!auth){
                throw new GraphQLError("Usuario no autenticado",{extensions:{code:'UNAUTHORIZED'}});
            }
            return createTask({name,deadline,capture,user_id:auth.sub});
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
}
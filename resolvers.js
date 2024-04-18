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

        }
    },
    Mutation:{

    },
}
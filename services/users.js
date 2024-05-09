import { connection } from "./connection.js";
const userTable=()=>connection.table('users');

export async function getUserByEmail(email){
    return await userTable().first().where({email});
}
export async function getUser(id){
    return await userTable().first().where({id});
}
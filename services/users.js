import { connection } from "./connection.js";
const userTable=()=>connection.table('users');

export async function getUserByEmail(email){
    return await userTable().first().where({email});
}
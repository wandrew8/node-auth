import { client } from '../db.js'
console.log("The client is " + client)
export const user = client.db("test").collection("user")
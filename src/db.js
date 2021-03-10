import mongo from 'mongodb'

const { MongoClient } = mongo

const url = process.env.MONGO_URL

export const client = new MongoClient(url, { useNewUrlParser: true })

export async function connectDb() {
    try {
        await client.connect()
        await client.db("admin").command({ ping: 1 })
        console.log("Successfully connected to the Database")
    } catch(e) {
        console.error(e)
        // if there is a problem, close the connection to the database
        await client.close()
    }
}
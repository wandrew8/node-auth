import './env.js'
import { fastify } from 'fastify'
import  fastifyStatic from 'fastify-static'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from './db.js'
import { registerUser } from './accounts/register.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = fastify();

async function startApp() {
    try {
        app.register(fastifyStatic, {
            root: path.join(__dirname, "public")
        })

        app.post("/api/register", {}, async (req, res) => {
            try {
                const { email, password } = req.body
                registerUser(email, password)
            } catch (e) {
                console.log(e)
            }
        })
        
        await app.listen(3000)
        console.log("Server listening at port 3000")
    } catch(e) {
        console.log(e)
    }
}

connectDb().then(() => {
    startApp()
})
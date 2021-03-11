import bcrypt from 'bcryptjs'
const { genSalt, hash } = bcrypt

export async function registerUser(email, password) {
    const { user } = await import("../user/user.js")
    console.log(user)
    //generate salt
    const salt = await genSalt(10);

    //hase with salt
    const hashedPassword = await hash(password, salt);

    //store in the database
    const result = await user.insertOne({
        email: {
            address: email,
            verified: false
        },
        password: hashedPassword
    })
    
    //retrun user from database
    return result.insertedId
}
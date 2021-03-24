import bcrypt from 'bcryptjs'
const { compare } = bcrypt;

export async function authorizeUser(email, password){
    //import user collection
    const { user } = await import ("../user/user.js")
    //Look up user password
    const userData = await user.findOne({
        'email.address': email
    })
    const userPassword = userData.password;
    const isAuthorized = await compare(password, userPassword)
    console.log("IsAuthorized", isAuthorized)
    return isAuthorized;
}
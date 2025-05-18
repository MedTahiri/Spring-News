import Cookie from "js-cookie"

const userList = [
    {
        id: "1",
        firstname: "Natalie",
        lastname: "Kim",
        email: "test@gmail.com",
        password: "123456",
        role: "journalist",
        bio: "Natalie Kim reports on economic policy and small business affairs, with a decade of experience covering financial legislation and commerce news."
    },{
    id: "2",
        firstname: "Mohamed",
        lastname: "Tahiri",
        email: "test@gmail.com",
        password: "123456",
        role: "user",
        bio:"software developer"
    }
]

export async function Login(email, password) {
    const user = userList.find(
        (user) => user.email === email && user.password === password
    )

    if (!user) {
        throw new Error("Invalid email or password")
    }

    Cookie.set("user", JSON.stringify(user), {expires: 7})

    return user
}

export async function Register(firstname, lastname, email, password,role, bio) {
    const id = (userList.length + 1).toString()

    userList.push({id,firstname,lastname,email,password,role,bio})

    Cookie.set("user", JSON.stringify({id,firstname,lastname,email,password,role,bio}), {expires: 7})

    return {id,firstname,lastname,email,password,role,bio}
}

export async function getUserById(userId){
    return userList.find((user) => user.id === userId)
}

export async function getAllUsers() {
    return userList
}
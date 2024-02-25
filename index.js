const { createServer } = require("./WSNET_Framework/_server/index.js");
const { randomBytes } = require("crypto");
const { log } = require("console");
const fs = require("fs");
const port = 8080;

const SearchUser = new Map()

createServer({ port }, async client => {
    //create the user and aut value
    var user = false;
    //on auth
    client.onGet("auth", data => {
        //check if the user is auth
        if (auth(data)) {
            //set the user to the sended username
            if (!user)
                user = data.u
            //return sucsess
            return true;
        }
        //return error
        else return false;
    });
    //on create user
    client.onGet("create_new_user", name => {
        if (!user) return createUser(name)
        else return false
    });

    client.onGet("user-data", user_id => {
        if (!user) return;
        return getUserData(user_id + "")
    })

    client.onGet("user-name", id => {
        if (!user) return
        id += ""
        var user_path = `data/user-data/${securifyPath(id)}/name.txt`
        if (!fs.existsSync(user_path)) return false
        return fs.readFileSync(user_path, "utf-8")
    })

    client.onGet("update-profile-data", data => {
        if (!(data instanceof Object)) return false;
        if (JSON.stringify(data).length > 10000) return false;
        //store the name
        fs.writeFileSync(`data/user-data/${securifyPath(user)}/name.txt`, data?.name + "", "utf-8");
        //store the description
        fs.writeFileSync(`data/user-data/${securifyPath(user)}/description.txt`, data?.description + "", "utf-8");
        //store the website
        fs.writeFileSync(`data/user-data/${securifyPath(user)}/website.txt`, data?.website + "", "utf-8");
        //store the email
        fs.writeFileSync(`data/user-data/${securifyPath(user)}/email.txt`, data?.email + "", "utf-8");
        //store the tel
        fs.writeFileSync(`data/user-data/${securifyPath(user)}/tel.txt`, data?.tel + "", "utf-8");
        //store the position
        fs.writeFileSync(`data/user-data/${securifyPath(user)}/position.txt`, data?.position + "", "utf-8");
        SearchUser.set(user, (
            data?.name
            + data?.description
            + data?.website
            + data?.email
            + data?.tel
            + data?.position
            + ""
        ).toLocaleLowerCase());
        return true
    })

    client.onGet("search-for-user", data => {
        if (!user) return false;
        return Search(data + "")
    })

})

function Search(search = "") {
    var result = []

    if (search.length == 0) return []

    Array.from(SearchUser.keys()).forEach(key => {
        if (SearchUser.get(key).includes(search.toLocaleLowerCase()))
            result.push(key)
    });

    return result.map(key => {
        return {
            name: fs.readFileSync(`data/user-data/${securifyPath(key)}/name.txt`, "utf-8"),
            key
        }
    });
}

function getUserData(user) {
    var root = `data/user-data/${securifyPath(user)}/`
    if (!fs.existsSync(root))
        return false
    return {
        description: fs.readFileSync(`${root}description.txt`, "utf-8"),
        email: fs.readFileSync(`${root}email.txt`, "utf-8"),
        name: fs.readFileSync(`${root}name.txt`, "utf-8"),
        position: fs.readFileSync(`${root}position.txt`, "utf-8"),
        tel: fs.readFileSync(`${root}tel.txt`, "utf-8"),
        website: fs.readFileSync(`${root}website.txt`, "utf-8"),
    }
}

//menage authentication
function auth(data) {
    //check if the user and password is set
    if (!data?.u || !data?.p) return false;
    //create the file path
    const userPath = `data/user/${securifyPath(data.u)}.txt`
    //check if the user exists
    if (!fs.existsSync(userPath)) return false;
    //get the password from the user-file
    const password = fs.readFileSync(userPath, "utf-8");
    //return the user-password is equalt to the sended password
    return password == (data?.p + "");

}
//create user
function createUser(name) {
    //create random userdata
    const userData = {
        u: securifyPath(randomBytes(20).toString("base64url")),
        p: randomBytes(40).toString("base64url")
    }
    //create the userfile path
    const userPath = `data/user/${userData.u}.txt`
    //check if the user not exists
    if (fs.existsSync(userPath)) return false;
    //store the password
    fs.writeFileSync(userPath, userData.p, "utf-8");
    //create an new user dir
    fs.mkdirSync(`data/user-data/${userData.u}`, { recursive: true })
    //store the name
    fs.writeFileSync(`data/user-data/${userData.u}/name.txt`, name + "", "utf-8");
    //store the description
    fs.writeFileSync(`data/user-data/${userData.u}/description.txt`, "Hello\nI'm new", "utf-8");
    //store the website
    fs.writeFileSync(`data/user-data/${userData.u}/website.txt`, "unset", "utf-8");
    //store the email
    fs.writeFileSync(`data/user-data/${userData.u}/email.txt`, "unset", "utf-8");
    //store the tel
    fs.writeFileSync(`data/user-data/${userData.u}/tel.txt`, "unset", "utf-8");
    //store the position
    fs.writeFileSync(`data/user-data/${userData.u}/position.txt`, "unset", "utf-8");

    SearchUser.set(userData.u, (name + "").toLocaleLowerCase());

    return userData;

}
//securify paths
function securifyPath(str) {
    return (str + "").split("/").join("_").split("\\").join("_");
}
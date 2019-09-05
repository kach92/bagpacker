var sha256 = require('js-sha256');
const SALT = "Jarpy Bear"

module.exports = (db) => {


    let signUp = (request, response) => {
        request.body.password = sha256(request.body.password);
        request.body.email = request.body.email.toLowerCase();
        db.users.isUserExist(request.body,(error,result)=>{
            if (!result.exists) {

                db.users.signUp(request.body,(error,result)=>{

                    if(result){
                        console.log("SIGN UP SUCCESS")
                        response.cookie("user_id", result.id);
                        response.cookie("user_name", result.firstname);
                        response.cookie("session", sha256(result.id + "logged_in" + SALT));
                        response.send(true)
                    }else{
                        console.log("SIGN UP FAIL")
                        response.send(false)
                    }
                })
            } else {
                console.log("EMAIL ALREADY EXISTS")
                response.send(false)
            }

        })


    };

    let login = (request, response) =>{
        request.body.password = sha256(request.body.password);
        request.body.email = request.body.email.toLowerCase();
        db.users.getUserByEmail(request.body,(error,result)=>{
            if (result) {
                if (result.password === request.body.password){
                    console.log("USER & PASSWORD MATCHED");
                    response.cookie("user_id", result.id);
                    response.cookie("user_name", result.firstname);
                    response.cookie("session", sha256(result.id + "logged_in" + SALT));
                    response.send(true);
                }else{
                    console.log("PASSWORD NOT MATCHED");
                    response.send(false);
                }

            } else {
                console.log("USER OR PASSWORD DOES NOT EXISTS")
                response.send(false)
            }

        })
    }

    let signOut = (request, response) =>{

        response.cookie("user_id", null)
        response.cookie("session", sha256(SALT))
        console.log("successful signout")
        response.send(true)
    }

    return {
        signUp : signUp,
        login : login,
        signOut : signOut
    }

};

var sha256 = require('js-sha256');

module.exports = (db) => {


    let signUp = (request, response) => {
        request.body.password = sha256(request.body.password);
        db.users.isUserExist(request.body,(error,result)=>{
            if (!result.exists) {

                db.users.signUp(request.body,(error,result)=>{

                    if(result){
                        console.log("SIGN UP SUCCESS")
                        response.cookie("user_id", result.id);
                        response.cookie("user_name", result.firstname);
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
        db.users.getUserByEmail(request.body,(error,result)=>{
            if (result) {
                if (result.password === request.body.password){
                    console.log("USER & PASSWORD MATCHED");
                    response.cookie("user_id", result.id);
                    response.cookie("user_name", result.firstname);
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

    return {
        signUp : signUp,
        login : login
    }

};

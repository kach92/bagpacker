module.exports = (db) => {


    let signUp = (request, response) => {

        db.users.isUserExist(request.body,(error,result)=>{
            console.log(result)
            if (!result.exists) {
                db.users.signUp(request.body,(error,result)=>{

                    if(result){
                        console.log("SIGN UP SUCCESS")
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

    return {
        signUp : signUp
    }

};

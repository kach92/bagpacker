var sha256 = require('js-sha256');
const SALT = "Jarpy Bear";

var cloudinary = require('cloudinary');
var configForCloudinary;
if (process.env.CLOUDINARY_URL) {
    configForCloudinary = process.env.CLOUDINARY_URL;
} else {
    configForCloudinary = require("../../../cloudinary.json");
}
cloudinary.config(configForCloudinary);

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

    let editProfileGeneral = async function (request,response){
        try{
            let user_id = request.cookies["user_id"];
            let editProfileGeneral = await db.users.editProfileGeneral(request.body,user_id);
            response.cookie("user_name", editProfileGeneral.firstname);
            response.send(true);
        }catch (error){
            console.log("edit profile general controller "+error)
        }
    }

    let editProfilePassword = async function (request,response){
        try{

            let user_id = request.cookies["user_id"];
            //check old password, if tally only change password
            let user_info = await db.users.getUserDetailsById(user_id);
            if(user_info.password === sha256(request.body.old_password)){
                let changePassword = await db.users.changePassword(sha256(request.body.new_password),user_id);
                response.send(true)
            }else{
                console.log("old password is wrong");
                response.send(false);
            }
        }catch (error){
            console.log("edit profile password controller"+error)
        }
    }

    let changeProfilePic = async function (request,response){
        try{
            console.log(request.body.newImage)
            let user_id = request.cookies["user_id"];
            let dataURI = request.body.newImage;
            let uploadStr = dataURI.replace(/(\r\n|\n|\r)/gm, "");

            let result = await cloudinary.uploader.upload(uploadStr,{ eager: [{width: 140, height: 140, crop: "fill"}]})
            let changePic = await db.users.changeProfilePic(user_id,result.eager[0].secure_url);
            response.send(true);

        }catch (error){
            console.log("change profile pic controller "+error)
        }
    }

    let getUserInfo = async function(request,response){
        try{
            let user_id = request.cookies["user_id"];
            let result = await db.users.getUserDetailsById(user_id);
            response.send(result)
        }catch (error){
            console.log("get user info controller "+ error)
        }
    }

    return {
        signUp : signUp,
        login : login,
        signOut : signOut,
        editProfileGeneral : editProfileGeneral,
        editProfilePassword : editProfilePassword,
        changeProfilePic : changeProfilePic,
        getUserInfo : getUserInfo
    }

};

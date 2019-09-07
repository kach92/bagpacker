/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
var format = require('pg-format');

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let signUp = (userInfo,callback)=>{
        let query = 'INSERT INTO users (firstName,lastName,email,password,gender) VALUES ($1,$2,$3,$4,$5) RETURNING *'
        let arr = [userInfo.firstName,userInfo.lastName,userInfo.email,userInfo.password,userInfo.gender]

        dbPoolInstance.query(query,arr,(error,queryResult)=>{
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        })

    }

    let isUserExist = (userInfo, callback) => {
        let query = "SELECT EXISTS (SELECT * FROM users WHERE email=$1)"
        let arr = [userInfo.email];

        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);

            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    let getUserByEmail = (userInfo,callback) =>{
        let query = "SELECT * FROM users WHERE email = $1"
        let arr = [userInfo.email]

        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    let getUserGender = async function (user_id){
        try{
            let query = "SELECT * FROM users WHERE id = $1";
            let arr = [user_id]
            let queryResult = await dbPoolInstance.query(query,arr)
            if(queryResult.rows.length>0){
                console.log("GET USER GENDER SUCCESS");
                return queryResult.rows[0].gender;
            }else{
                return Promise.reject(new Error("get user gender returns null"));
            }

        } catch (error){
            console.log("get user gender" + error);
        }
    }

    let getUserIdsByEmails = async function (email_arr){
        try{
            let arr = [email_arr]
            let query = format("SELECT id FROM users WHERE email IN %L",arr);
            let queryResult = await dbPoolInstance.query(query);
            if(queryResult.rows.length>0){
                console.log("GET USER IDS SUCCESS");
                let idArr = queryResult.rows.map(obj => obj.id)
                return idArr;
            }else{
                return Promise.reject(new Error("get user ids return nulls"));
            }
        } catch (error) {
            console.log("get user ids by emails" +error)
        }
    }

    let createGroup = async function (tripInfo){
        try{
            let query = "INSERT INTO groups (name) VALUES ($1) RETURNING *"
            let arr = [`Trip to ${tripInfo.location}`]
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("CREATE GROUP SUCCESS");
                return queryResult.rows[0].id;
            }else{
                return Promise.reject(new Error("create group return null"));
            }
        } catch (error) {
            console.log("create group model" + error)
        }
    }

    let insertUserIntoGroups = async function (group_id,user_ids_arr){
        try{
            let user_ids_arrOfarr = user_ids_arr.map(x=>[x,group_id])
            let query = format('INSERT INTO groups_users (user_id,group_id) VALUES %L RETURNING *',user_ids_arrOfarr);
            let queryResult = await dbPoolInstance.query(query);
            if(queryResult.rows.length>0){
                console.log("INSERT USER INTO GROUP SUCCESS");
                return queryResult.rows;
            }else{
                return Promise.reject(new Error("insert user into groups returns null"));
            }
        } catch (error) {
            console.log("insert user into group model"+error)
        }
    }

    let getUserIdAndGender = async function (user_ids_arr){
        try{
            let someArr = [user_ids_arr]
            let query = format("SELECT id,gender FROM users WHERE id IN %L",someArr);
            let queryResult = await dbPoolInstance.query(query);
            if(queryResult.rows.length>0){
                console.log("GET USER ID AND GENDER SUCCESS");
                return queryResult.rows;
            }else{
                return Promise.reject(new Error("get user id and gender returns null"));
            }
        } catch (error) {
            console.log("get user id and gender model" + error)
        }
    }

    let getUserGroups = async function (user_id){
        try{
            let query = 'SELECT group_id FROM groups_users WHERE user_id = $1';
            let arr = [user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("GET USER GROUPS SUCCESS");
                console.log(queryResult.rows)
                let result = queryResult.rows.map(x=>x.group_id);
                return result;
            }else{
                console.log("USER NO GROUPS")
                return []
            }
        } catch (error) {
            console.log("get user groups model " + error)
        }
    }

    let getUserDetailsById = async function (user_id){
        try{
            let query = 'SELECT * FROM users WHERE id = $1'
            let arr = [user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("GET USER DETAILS BY ID SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("get user details by id return null"));
            }
        } catch (error){
            console.log("get user details by id " +error)
        }
    }

    let deleteGroup = async function(group_id){
        try{
            let query = 'DELETE FROM groups WHERE id = $1 RETURNING *';
            let arr = [group_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("DELETE GROUP SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("delete group return null"));
            }

        }catch (error){
            console.log("delete group model" +error)
        }
    }

    let editProfileGeneral = async function (user_info,user_id){
        try{
            let query = 'UPDATE users SET firstname=$1,lastname=$2,email=$3 WHERE id=$4 RETURNING *' ;
            let arr = [user_info.firstName,user_info.lastName,user_info.email,user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("EDIT PROGILE GENERAL SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("edit profile general returns null"));
            }

        } catch (error){
            console.log("edit profile general model "+error)
        }
    }

    let changePassword = async function (new_password,user_id){
        try{
            let query = 'UPDATE users SET password = $1 WHERE id =  $2 RETURNING *';
            let arr = [new_password,user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("CHANGE PASSWORD SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("change password return null"));
            }
        }catch (error){
            console.log("change password model "+error)
        }
    }

    let changeProfilePic = async function (user_id,image_url){
        try{
            let query = "UPDATE users SET image = $1 WHERE id = $2 RETURNING *";
            let arr = [image_url,user_id];
            let queryResult = await dbPoolInstance.query(query,arr);
            if(queryResult.rows.length>0){
                console.log("CHANGE PROFILE PIC SUCCESS");
                return queryResult.rows[0];
            }else{
                return Promise.reject(new Error("change profile pic returns null"));
            }

        }catch (error){
            console.log("change profile pic model "+error)
        }
    }

    return {
        signUp,
        isUserExist,
        getUserByEmail,
        getUserGender,
        getUserIdsByEmails,
        createGroup,
        insertUserIntoGroups,
        getUserIdAndGender,
        getUserGroups,
        getUserDetailsById,
        editProfileGeneral,
        deleteGroup,
        changePassword,
        changeProfilePic

    };
};

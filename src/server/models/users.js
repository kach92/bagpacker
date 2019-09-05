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
        let query = "SELECT * FROM users WHERE name = $1"
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
            let query = format("SELECT id FROM users WHERE email IN %L",email_arr);
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
            let arr = [`Trip to ${tripInfo.destination}`]
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
            let query = format('INSERT INTO users_groups (user_id,group_id) VALUES %L RETURNING *',user_ids_arrOfarr);
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
            let query = "SELECT id,gender FROM users WHERE id IN $1";
            let arr = [user_ids_arr];
            let queryResult = await dbPoolInstance.query(query,arr);
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
                let result = queryResult.rows.map(x=>{x.group_id});
                return result;
            }else{
                return Promise.reject(new Error("get user groups return null"));
            }
        } catch (error) {
            console.log("get user groups model " + error)
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
        getUserGroups

    };
};

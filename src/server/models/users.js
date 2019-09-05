/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
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
            let result = await dbPoolInstance.query(query,arr)
            return result.rows.length > 0 ? result.rows[0].gender : null;

        } catch (error){
            console.log("get user gender" + error);
        }
    }


    return {
        signUp,
        isUserExist,
        getUserByEmail,
        getUserGender

    };
};

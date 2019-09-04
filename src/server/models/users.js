/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let signUp = (userInfo,callback)=>{
        let query = 'INSERT INTO users (name,email,contact,password,gender) VALUES ($1,$2,$3,$4,$5) RETURNING *'
        let arr = [userInfo.name,userInfo.email,userInfo.contact,userInfo.password,userInfo.gender]

        dbPoolInstance.query(query,arr,(error,queryResult)=>{
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, true);
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


    return {
        signUp,
        isUserExist,

    };
};

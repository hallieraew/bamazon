var sqlPass = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  };

  module.exports = sqlPass;

  //I had to include root as a string because using user:root in the dot.env was pulling in halliew instead of "root".
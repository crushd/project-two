require("dotenv").config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "nsfcr8r8j922jdmb",
    password: "qylkfq2d1f1uvetp",
    database: "u2elzcxk459slca9",
    host: "bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    use_env_variable: "JAWSDB_URL"
  }
};

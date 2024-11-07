const config = {
  HOST: "localhost",
  PORT: 5432,
  USER: "postgres",
  PASSWORD: "1018",
  DB: "db_jwtbootcamp",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config;

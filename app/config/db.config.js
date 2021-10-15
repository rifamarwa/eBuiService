module.exports = {
    HOST: "192.168.29.91",
    USER: "root",
    PASSWORD: "jaringan123",
    DB: "database_news_rifa",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
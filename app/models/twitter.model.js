module.exports = (sequelize, Sequelize) => {
    const Twitter = sequelize.define("twitter_tb", {
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      text: {
        type: Sequelize.STRING
      },
      profile_image: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      }
    },
    {
      tableName: 'twitter_tb',
      //freezeTableName: true,
      timestamps: false
    });
  
    return Twitter;
  };
  
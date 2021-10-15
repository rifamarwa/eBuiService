module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news_tb", {
        title_news: {
          type: Sequelize.STRING
        },
        media_name: {
            type: Sequelize.STRING
        },
        date: {
          type: Sequelize.DATE
        },
        content_text: {
          type: Sequelize.STRING
        },
        link_image: {
          type: Sequelize.TEXT
        }
      },
      {
        tableName: 'news_tb',
        //freezeTableName: true,
        timestamps: true,
        updatedAt: 'updated_date',
        createdAt: 'created_date'
      });
    
      return News;
}
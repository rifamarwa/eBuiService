module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee_tb", {
        first_name: {
          type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        organization: {
          type: Sequelize.STRING
        },
        salary: {
          type: Sequelize.DECIMAL(11,2)
        },
        status: {
          type: Sequelize.INTEGER
        },
        is_deleted : {
            type: Sequelize.INTEGER
        },
        photo_profile: {
            type: Sequelize.TEXT
        }
      },
      {
        tableName: 'employee_tb',
        //freezeTableName: true,
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return Employee;
}
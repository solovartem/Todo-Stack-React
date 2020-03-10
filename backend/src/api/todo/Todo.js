const { Model, DataTypes } = require('sequelize');

class Todo extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'todoSchemas'
            }
        )
    }
}
module.exports = Todo;

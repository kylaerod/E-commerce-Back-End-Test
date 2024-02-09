const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const Product = require('./Product'); // Import the Product model after Category

class Category extends Model {}

Category.init(
  { // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
   
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Check if Product model is a subclass of Sequelize.Model
if (!(Product.prototype instanceof Model)) {
  throw new Error('Product is not a subclass of Sequelize.Model');
}

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

module.exports = Category;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    generateToken() {
      const payload = {
        id: this.id,
        email: this.email,
      };
      const rahasia = 'sECRETr';
      const token = jwt.sign(payload, rahasia);
      return token;
    }

    static async authenticate({ email, password }) {
      try {
        const user = await this.findOne({ where: { email } });
        if (!user) return Promise.reject('User not found!');
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject('Wrong password');
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
  
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    url: DataTypes.STRING,
    bio: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

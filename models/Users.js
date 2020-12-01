const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    { timestamps: false },
  );

  return Users;
};

module.exports = createUsers;

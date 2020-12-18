module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      user_id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: type.STRING,
      lat: type.STRING,
      long: type.STRING,
    },
    { freezeTableName: true }
  );
};

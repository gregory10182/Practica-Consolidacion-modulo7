module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define("bootcamps", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 5,
        max: 20
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Bootcamp;
};
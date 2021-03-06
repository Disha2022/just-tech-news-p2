const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;


// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');
// const bycrypt = require('bcrypt')

// //create our user model
// class User extends Model{
//   // set up method to run on instance data (per user) to check password
//   checkPassword(loginPw) {
//     return bycrypt.compareSync(loginPw, this.password);
//   }

// } //ask***

// //define table columns and configuration
// User.init (
//     {
//         //TABLE COLUMN DEFINITIONS GO HERE
//         //define id column
//         id:{
//                  // use the special Sequelize DataTypes object provide what type of data it is
//                  type: DataTypes.INTEGER,
//                  //this is the equivalent of SQL's `not null` option
//                  allowNull: false,
//                  //instruct that this is the Primary Key
//                  primaryKey: true,
//                  //turn on auto increment
//                  autoIncrement: true,
//         },
//         // define a username column
//         username: {
//             type:DataTypes.STRING,
//             allowNull: false
//         },
//         //define an email column
//         email:{
//             type:DataTypes.STRING,
//             allowNull: false,
//             //there cannot be any duplicate email values in this table
//             unique: true,
//             //If allowNull is set to false we can run our data through validators before creating the table data
//       validate: {
//           isEmail:true
//         }

//     },
    
//         //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
// // define a password column
// password:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     validate: {
//         //this means the password must be at least four character long
//         len:[4]

//     }
// }

//     },

     
//     {

//         hooks: {
//             // set up beforeCreate lifecycle "hook" functionality
// async beforeCreate(newUserData){
//     newUserData.password = await bycrypt.hash(newUserData.password,10);
//     return newUserData;
// },
//   // set up beforeUpdate lifecycle "hook" functionality
//   async beforeUpdate(updatedUserData) {
//     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//     return updatedUserData;
//   }
// },
        
//         //PASS IN OUR IMPORTED SEQUALIZE CONNECTION (DIRECT CONNECTION TO OUR DATABASE)
// sequelize,
//         //    // don't automatically create createdAt/updatedAt timestamp fields
//         timestamps:false, //?
//         // don't pluralize name of database table
//         freezeTableName: true,
//         //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
//         underscored: true,
//          // make it so our model name stays lowercase in the database
//          modelName:'user'
//     }
    
// );

// module.exports = User;
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
//  logging: false
});

const Page = db.define(`page`, {
    title: {
        type: Sequelize.STRING, // 255 characters
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING, // 255 characters
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT, 
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
        //allowNull: false
    }
});


const User = db.define(`user`, {
    name: {
        type: Sequelize.STRING, // 255 characters
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, // 255 characters
        allowNull: false,
        validate: {
           isEmail:true
        }
//        unique: {
//          args: true,
//          msg: 'Email address already in use!'
//        }
    }
});


Page.addHook('beforeValidate', (page, options) => {
  page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
});




module.exports = {
  db, Page, User
}

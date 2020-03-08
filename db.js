const pg = require('pg');
const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/acme_nouns');

// TODO: try destructuring from Sequelize

const Person = conn.define("person", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        allowEmpty: false,
    },
});
const Place = conn.define("place", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        allowEmpty: false,
    },
});

const Thing = conn.define("thing", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        allowEmpty: false,
    },
});

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [person1, person2] = await Promise.all([
        Person.create({ name: 'Paul' }),
        Person.create({ name: 'Andres' })
    ]);
    const [place1, place2] = await Promise.all([
        Place.create({ name: 'Colombia' }),
        Place.create({ name: 'Ecuador' })
    ]);
    const [thing1, thing2] = await Promise.all([
        Thing.create({ name: 'laptop' }),
        Thing.create({ name: 'book' })
    ]);
    
}

module.exports = {
    syncAndSeed,
    models: {
        Person,
        Place,
        Thing
    },
};

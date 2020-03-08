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

Person.belongsTo(Place);
Place.hasMany(Person);
Thing.belongsTo(Person);
Person.hasMany(Thing);

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [colombia, ecuador] = await Promise.all([
        Place.create({ name: 'Colombia' }),
        Place.create({ name: 'Ecuador' })
    ]);
    const [paul, andres] = await Promise.all([
        Person.create({ name: 'Paul', placeId: colombia.id }),
        Person.create({ name: 'Andres', placeId: ecuador.id })
    ]);
    const [laptop, book] = await Promise.all([
        Thing.create({ name: 'laptop', personId: paul.id }),
        Thing.create({ name: 'book', personId: andres.id })
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

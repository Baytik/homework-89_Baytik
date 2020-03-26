const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'user',
        password: '123',
        token: '123sadhffhds'
    }, {
        username: 'admin',
        password: '12345',
        token: 'sadn324nsds',
        role: 'admin'
    });

    const [cent, rihanna] = await Artist.create({
        artist: '50Cent',
        information: 'Hip Hop',
        image: '50cent.jpeg'
    }, {
        artist: 'Rihanna',
        information: 'Singer',
        image: 'rihanna.jpeg'
    });

    const [inDaClub, handsUp, Umbrella, Monster] = await Album.create({
        title: 'In da club',
        year: 2007,
        image: 'in-da-club.jpeg',
        artist: cent
    }, {
        title: 'Hands up',
        year: 2006,
        image: 'hands-up.jpeg',
        artist: cent
    }, {
        title: 'Umbrella',
        year: 2007,
        image: 'umbrella.jpeg',
        artist: rihanna
    }, {
        title: 'Monster',
        year: 2009,
        image: 'monster.jpeg',
        artist: rihanna
    });

    const tracks = await Track.create({
        title: 'In da club',
        year: 2007,
        image: 'in-da-club.jpeg',
        artist: cent
    }, {
        title: 'Hands up',
        year: 2006,
        image: 'hands-up.jpeg',
        artist: cent
    }, {
        title: 'Umbrella',
        year: 2007,
        image: 'umbrella.jpeg',
        artist: rihanna
    }, {
        title: 'Monster',
        year: 2009,
        image: 'monster.jpeg',
        artist: rihanna
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});
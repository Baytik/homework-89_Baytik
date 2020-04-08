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
        token: '123sadhffhds',
        firstName: 'Jack'
    }, {
        username: 'admin',
        password: '12345',
        token: 'sadn324nsds',
        role: 'admin',
        firstName: 'John'
    });

    const [cent, rihanna] = await Artist.create({
        artist: '50Cent',
        information: 'Hip Hop',
        image: '50cent.jpeg',
        published: true
    }, {
        artist: 'Rihanna',
        information: 'Singer',
        image: 'rihanna.jpeg',
        published: true
    });

    const [inDaClub, handsUp, Umbrella, Monster] = await Album.create({
        title: 'In da club',
        year: 2007,
        image: 'in-da-club.jpeg',
        artist: cent,
        published: true
    }, {
        title: 'Hands up',
        year: 2006,
        image: 'hands-up.jpeg',
        artist: cent,
        published: true
    }, {
        title: 'Umbrella',
        year: 2007,
        image: 'umbrella.jpeg',
        artist: rihanna,
        published: true
    }, {
        title: 'Monster',
        year: 2009,
        image: 'monster.jpeg',
        artist: rihanna,
        published: true
    });

    const tracks = await Track.create({
        title: 'Street king',
        duration: 3.47,
        counter: 1,
        album: inDaClub._id,
        published: true
    }, {
        title: 'Good Guy',
        duration: 3.7,
        counter: 2,
        album: inDaClub._id,
        published: true
    }, {
        title: 'Bad Guy',
        duration: 7,
        counter: 3,
        album: inDaClub._id,
        published: true
    }, {
        title: 'Champion',
        duration: 47,
        counter: 4,
        album: inDaClub._id,
        published: true
    }, {
        title: 'Something',
        duration: 3.47,
        counter: 5,
        album: inDaClub._id,
        published: true
    }, {
        title: 'Hands up',
        duration: 4,
        counter: 1,
        album: handsUp._id,
        published: true
    }, {
        title: 'King',
        duration: 2,
        counter: 2,
        album: handsUp._id,
        published: true
    }, {
        title: 'Street',
        duration: 1.23,
        counter: 3,
        album: handsUp._id,
        published: true
    }, {
        title: 'Gangster',
        duration: 2.53,
        counter: 4,
        album: handsUp._id,
        published: true
    }, {
        title: 'Nigga',
        duration: 3.1,
        counter: 5,
        album: handsUp._id,
        published: true
    }, {
        title: 'Umbrella',
        duration: 4.1,
        counter: 1,
        album: Umbrella._id,
        published: true
    }, {
        title: 'Rain',
        duration: 4.5,
        counter: 2,
        album: Umbrella._id,
        published: true
    }, {
        title: 'Hard',
        duration: 2.7,
        counter: 3,
        album: Umbrella._id,
        published: true
    }, {
        title: 'Easy',
        duration: 2.1,
        counter: 4,
        album: Umbrella._id,
        published: true
    }, {
        title: 'Something',
        duration: 5,
        counter: 5,
        album: Umbrella._id,
        published: true
    }, {
        title: 'Monster',
        duration: 1.5,
        counter: 1,
        album: Monster._id,
        published: true
    }, {
        title: 'Sleep',
        duration: 1.7,
        counter: 2,
        album: Monster._id,
        published: true
    }, {
        title: 'She',
        duration: 1.3,
        counter: 3,
        album: Monster._id,
        published: true
    }, {
        title: 'Something',
        duration: 1.8,
        counter: 4,
        album: Monster._id,
        published: true
    }, {
        title: 'Work',
        duration: 2.3,
        counter: 5,
        album: Monster._id,
        published: true
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});
const connection = require('../config/connection');
const { User, Thoughts} = require('../models');
const { getRandomUser, getRandomThought} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected!');
  // Delete everythign from db
  await User.deleteMany({});
  await Thoughts.deleteMany({});
  
  const userThoughts= [];
  const thoughts = getRandomThought(8);

  for (let i = 0; i < 8; i++) {
    const username = getRandomUser();
    
    userThoughts.push({
      username,
      thoughts
    });
  };

  User.collection.insertMany(userThoughts);
  Thoughts.collection.insertMany(thoughts);

  console.table(userThoughts);
  console.table(thoughts)
  console.info('Seed sucesfull! 🌱');
  process.exit(0);
});
const user = [ 'Fernanda', 'Miguel', 'Angel', 'Ana', 'Sofia', 'Alexa', 'Renata', 'Paulina', 'Mirti', 'Yiyis'];

const thought = ['Im very happy', 'I want to go shopping', 'Im hungry', 'Need another coffee', 'Wants more toys']

// Get random user && thought
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get random user
const getRandomUser = () => `${getRandomItem(user)}`;

// Create random thought
const getRandomThought = (int)  => {
  const result = [];
  for(let i = 0; i < int; i++) {
    result.push({
      thoughtText: getRandomItem(thought)
    });
  }

  return result;
};


module.exports = { getRandomUser, getRandomThought};
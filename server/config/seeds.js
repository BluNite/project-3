const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
  await User.deleteMany();

  // const users = await User.insertMany([
  //   { username: 'rnessa', 
  //     email: 'rnessa2011@gmail.com',
  //     password: 'Password1'
  //   },
  //   { username: 'Jonna',
  //     email: 'abcd1234@yahoo.com',
  //     password: 'ABCD1234@'
    
  //   },
    
    
  // ]);
  await User.create({
    username: 'Pamela',
    email: 'email@amil.com',
    password: 'password12345',

  });

 await User.create({
    username: 'julio',
    email: 'emasffssl@gmail.com',
    password: 'password12345',

  });

  console.log('User seeded');

  

  process.exit();
});

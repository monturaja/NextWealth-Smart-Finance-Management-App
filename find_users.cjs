const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  email: String,
  role: String,
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function findUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    const users = await User.find({}, 'email role');
    console.log('Total Users:', users.length);
    console.log('Users:', JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

findUsers();

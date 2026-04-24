const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Hardcoded URI for script execution since dotenv is missing in current context
const MONGODB_URI = 'mongodb+srv://vaishnavmontu3_db_user:nextwealth123@cluster0.qoz4haa.mongodb.net/nextwealth?retryWrites=true&w=majority';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false },
  role: String,
}, { strict: false, timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    
    const email = 'admin@nextwealth.com';
    const password = 'admin123';
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin already exists. Updating role to admin...');
      existingUser.role = 'admin';
      await existingUser.save();
      console.log('Admin updated.');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name: 'System Admin',
        email,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created: admin@nextwealth.com / admin123');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();

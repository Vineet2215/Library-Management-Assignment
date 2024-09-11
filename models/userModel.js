const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// // Hash the password before saving the user model
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     try {
//       // Hash password asynchronously
//       this.password = await bcrypt.hash(this.password, 10);
//     } catch (err) {
//       return next(err);
//     }
//   }
//   next();
// });

// // Compare password method for login
// userSchema.methods.comparePassword = async function (password) {
//   try {
//     // Compare the provided password with the stored hash
//     return await bcrypt.compare(password, this.password);
//   } catch (err) {
//     throw err;
//   }
// };

const User = mongoose.model('User', userSchema);
module.exports = User;

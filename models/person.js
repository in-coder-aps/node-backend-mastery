import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Define the Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  salary: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save', async function (next) {
  const person = this;
  // console.log('In the pre function!!');
  //Hash the password only if it has been modified
  if (!person.isModified('password')) return next();
  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    console.log(`${hashedPassword}::Hashed Pass`);
    //Override the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Pre-update hook to hash the password before updating
personSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  // Check if the password field is being updated
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.password, salt);
      update.password = hashedPassword; // Override the plain password with the hashed password
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    next(); // Proceed if no password update
  }
});

personSchema.methods.comparePassword = async function (candidatPassword) {
  try {
    //Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
//Create Person model
export const Person = mongoose.model('person', personSchema);
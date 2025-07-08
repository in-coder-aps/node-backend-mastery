import express from 'express';
import { Person } from '../models/person.js';
import { jwtAuthMiddleware, generateToken, authorizeRoles } from '../middlewares/index.js';

const router = express.Router();

//GET method to get all the person details
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
    console.log("✅ Person's Data fetched succesfully!");
  } catch (error) {
    console.error('❌ Error saving person details:', error);
    res.status(500).json({ error: 'Internal server error!!' });
  }
});

//Profile route
router.get('/profile', jwtAuthMiddleware,(req, res, next) => {
  console.log('Profile route hit');
  next();
}, async (req, res) => {
  try {
    console.log('Profile route hit');
    const userData = req.user;

    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error!' });
  }
});

router.get('/:work', async (req, res) => {
  try {
    const workType = req.params.work; // Extract the work type from the URL parameter
    const persons = await Person.find({ work: workType });

    // Send the list of persons with the specified work type as a JSON response
    res.json(persons);
  } catch (error) {
    console.error('❌ Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Post route to add a person
router.post('/signup', async (req, res) => {
  try {
    const newPersonData = req.body;
    const newPerson = new Person(newPersonData);
    // Save the new person to the database using await
    const savedPerson = await newPerson.save();

    console.log('✅ Saved person to the database');

    const payload = {
      id: savedPerson.id,
      username: savedPerson.username,
      work: savedPerson.work
    }
    const token = generateToken(payload)
    console.log("Token is: ", token);

    res.status(201).json({ response: savedPerson, token: token });
  } catch (error) {
    console.error('❌ Error saving person details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Login Route
router.post('/login', async (req, res) => {
  try {
    //Extract username and password from requst body
    const { username, password } = req.body;

    //Find the user by username
    const user = await Person.findOne({ username: username });

    //If user does not exists or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username,
      work: user.work
    }
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id',jwtAuthMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    });

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Send the updated person data as a JSON response
    res.json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', jwtAuthMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Send a success message as a JSON response
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
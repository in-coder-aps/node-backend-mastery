import express from 'express'
import { Person } from '../models/person.js';

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
router.post('/', async (req, res) => {
  try {
    const newPersonData = req.body;
    const newPerson = new Person(newPersonData);
    // Save the new person to the database using await
    const savedPerson = await newPerson.save();

    console.log('✅ Saved person to the database');
    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('❌ Error saving person details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
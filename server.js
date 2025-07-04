import bodyParser from 'body-parser';
import db from './db.js';
import express from 'express';
import { Person } from './models/person.js';
import { MenuItem } from './models/menuItem.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1>🍽️ Welcome to the Data Kitchen — Where We Cook APIs and Serve Exactly What You Crave!</h1>");
});


//GET method to get all the person details
app.get('/person',async (req,res)=>{
   try {
     const data =await Person.find();
     res.status(200).json(data);
     console.log("✅ Data fetched succesfully");
   } catch (error) {
      console.error('❌ Error saving person details:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});


//Post route to add a person
app.post('/person', async (req, res) => {
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

//GET method to get all the menu items list
app.get('/menu',async (req,res)=>{
   try {
     const data =await MenuItem.find();
     res.status(200).json(data);
     console.log("✅ Data fetched succesfully");
   } catch (error) {
      console.error('❌ Error saving menu item:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});


//Post route to add a menu item
app.post('/menu', async (req, res) => {
    try {
        const newMenuData = req.body;
        const newItem = new MenuItem(newMenuData);
        // Save the new person to the database using await
        const savedItem = await newItem.save();

        console.log('✅ Saved menu item to the database');
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('❌ Error saving menu item details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
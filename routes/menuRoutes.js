import express from 'express';
import { MenuItem } from '../models/menuItem.js';
import { jwtAuthMiddleware, authorizeRoles } from '../middlewares/index.js';

const router = express.Router();
// const basicAuthMiddleware = passport.authenticate('basic', { session: false });

//GET method to get all the menu items list
router.get('/',jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await MenuItem.find();
    res.status(200).json(data);
    console.log("✅ Menu List fetched succesfully!");
  } catch (error) {
    console.error('❌ Error saving menu item:', error);
    res.status(500).json({ error: 'Internal server error!!' });
  }
});

//GET method to get the menu items based on taste
router.get('/:taste',jwtAuthMiddleware, async (req, res) => {
  try {
    const tasteType = req.params.taste; // Extract the taste type from the URL parameter
    const menuList = await MenuItem.find({ taste: tasteType });

    // Send the list of persons with the specified work type as a JSON response
    res.json(menuList);
  } catch (error) {
    console.error('❌ Error fetching menuItems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Post route to add a menu item
router.post('/',jwtAuthMiddleware, authorizeRoles('chef', 'manager'), async (req, res) => {
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

//For updating any items
router.put('/:id', jwtAuthMiddleware, authorizeRoles('chef', 'manager'), async (req, res) => {
  try {
    const itemId = req.params.id; // Extract the item's ID from the URL parameter
    const updatedItemData = req.body; // Updated data for the item

    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, updatedItemData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Send the updated item's data as a JSON response
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating the item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', jwtAuthMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const itemId = req.params.id; // Extract the item's ID from the URL parameter

    const deletedItem = await MenuItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Send a success message as a JSON response
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
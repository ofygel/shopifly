const express = require('express');
const router = express.Router();
const axios = require('axios');

// Получение товаров из Strapi
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:1337/api/products');
    res.json(response.data.data.map(item => ({
      id: item.id,
      ...item.attributes
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
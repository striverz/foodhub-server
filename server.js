const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Enable CORS for all routes

// For Restaurant API
app.get('/api/restaurants', async (req, res) => {
    try {
        const { lat, lng, page_type } = req.query;

        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;

        // Fetch data from Swiggy API
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch restaurant data');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in /api/restaurants:', error.message);
        res.status(500).send('An error occurred while fetching restaurant data');
    }
});

// For Menu API
app.get('/api/menu', async (req, res) => {
    try {
        const { restaurantId } = req.query;

        const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId=${restaurantId}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch menu data');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in /api/menu:', error.message);
        res.status(500).send('An error occurred while fetching menu data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

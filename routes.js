const express = require('express');
const router = express.Router();

const baseURL = 'https://jsonplaceholder.typicode.com';
const TOP_N_USERS = 10;

// Define routes
router.get('/getUsers', async (req, res) => {
    try {
        let response = await fetch(`${baseURL}/users`);
        response = await response.json();
        
        const users = response.map(user => ({...user, winCount: Math.floor(Math.random() * 99)}))
        const sortedUsers = users.sort((a,b) => {
            if(a.winCount > b.winCount ) return -1;
            if(a.winCount < b.winCount) return 1;
            return 0;
        })
        const firstTenUsers= sortedUsers.slice(0,TOP_N_USERS)
        // console.log({firstTenUsers})
        res.status(200).json(firstTenUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Internal Server Error.` });
    }
});

router.get('/getPhotos', async (req, res) => {
    const { page, limit } = req
    try {
        let response = await fetch(`${baseURL}/photos?_page=${page}&_limit=${limit}`);
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Internal Server Error.` });
    }
});

module.exports = router;

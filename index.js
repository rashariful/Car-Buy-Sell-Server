const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000


// middle ware
app.use(cors())
app.use(express())




app.get('/', (req, res) => {
    res.send('Used car server is running')
})
app.listen(port, () => {
    console.log(`Used car  server is running on: ${port}`);
})
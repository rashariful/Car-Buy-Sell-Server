const express = require('express');
const { MongoClient, } = require('mongodb');
const app = express();
require("dotenv").config()
const cors = require('cors');
const port = process.env.PORT || 5000


// Middle ware
app.use(cors())
app.use(express.json())








const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri)

const productsCollection = client.db('doctorsPortal').collection('products')

async function dbConnect() {
    try {
        await client.connect()
        console.log('mongodb connected with server');
    } catch (error) {
        console.log(error);
    }
}
dbConnect()


app.post('/products', async (req, res) =>{
   try {
       const product = req.body;
       const result = await productsCollection.insertOne(product)
       res.send(result)
   } catch (error) {
    console.log(error.message);
    
   }
})

app.get('/products', async ( req, res) =>{
    try {
        const query = {}
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    } 
    catch (error) {
        console.log(error.message);
    }
})













app.get('/', (req, res) => {
    res.send('Doctor portal server is running')
})
app.listen(port, () => {
    console.log(`Doctor portal server is running on: ${port}`);
})
const express = require('express');
const { MongoClient, ObjectId, } = require('mongodb');
const app = express();
require("dotenv").config()
const cors = require('cors');
const port = process.env.PORT || 5000


// Middle ware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@used-car-museum.jf287ra.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri)

const productsCollection = client.db('usedCarMuseum').collection('products')
const bookingsCollection = client.db('usedCarMuseum').collection('bookings')
const usersCollection = client.db('usedCarMuseum').collection('users')


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



app.get('/products/:brand', async (req, res) => {
   
    try {
        const brand = req.params.brand;
        const query = { brand: brand }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
})






app.delete('/products/:id', async (req, res) =>{
  try {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await productsCollection.deleteOne(query)
      res.send(result)
  } catch (error) {
    console.log(error.message);
  }
})






app.get('/bookings', async (req, res) => {
  try {
      const email = req.query.email;
      const query = { email: email }
      const bookins = await bookingsCollection.find(query).toArray()
      res.send(bookins)
  } catch (error) {
    console.log(error);
  }
})

app.post('/bookings', async (req, res) => {
  try {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking)
      res.send(result)
  } catch (error) {
    console.log(error);
  }

})

app.delete('/bookings/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    console.log(query);
    const result = await bookingsCollection.deleteOne(query)
    res.send(result)
})


app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user)
    res.send(result)
})

app.get('/users', async (req, res) => {
    const query = {}
    const result = await usersCollection.find(query).toArray()
    res.send(result)
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) }
    const result = await usersCollection.deleteOne(query)
    res.send(result)
})











app.get('/', (req, res) => {
    res.send('assingment server is running')
})
app.listen(port, () => {
    console.log(`assingment server is running on: ${port}`);
})
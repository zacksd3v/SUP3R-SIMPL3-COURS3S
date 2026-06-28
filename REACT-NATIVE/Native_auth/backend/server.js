const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Bayani: Wannan yana bawa server din damar karbar data ta JSON (kamar email da password)
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("[+] MongoDB Compass Connected Successfully!"))
  .catch((err) => console.log("An Error Occur While Connecting to Mongo Database: ", err));

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send("Server is working perfectly");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[+] Server is running on Port: ${PORT}`);
});
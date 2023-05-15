const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routers
app.get('/databases', async(req, res) => {
    try {
        const alldb = await pool.query("SELECT * FROM student");
        res.json(alldb.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () =>{
    console.log("hello");
});
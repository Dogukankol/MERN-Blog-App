import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express()
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        author: "Doğukan Kol",
        message: "Lorem Ipsum"
    })
});


app.use("/posts", postRoutes)

mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

}).catch(error => {
    app.listen(process.env.PORT, () => {
        console.log(`Welldone ${process.env.PORT}`)
    })
}).catch((error) => {
    console.error(error.message)
});


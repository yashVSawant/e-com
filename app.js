const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const userRoute = require('./routers/user');
const productRoute = require('./routers/product')

app.use(cors('*'));
app.use(bodyParser.json());

app.use("/api/auth",userRoute);
app.use("/api/products",productRoute);

app.use((req,res,next)=>{
    res.status(404).send('Error: 404');
})

mongoose.connect("mongodb+srv://yashsawant310:XtPFJIFySyCOtjZm@cluster0.hp8gwv4.mongodb.net/e-com?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000,()=>{
        console.log("running");
    })
})

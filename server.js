const express = require('express');
const app = express();
const cors = require("cors");

const errorHandler = require('./errors/errorHandler');
const router = require('./routes/index.route');

const { PORT } = require("./global");

app
    .use(cors())
    .use(express.json({ limit: '50mb' }))
    .use(express.urlencoded({ extended: true, limit: '50mb' }))
    .use("/", router)
    .use(errorHandler);

try 
{
    app.listen(PORT, () => 
    {
        console.log(`Mail API server listening on port ${PORT}`);
    });

} 
catch (e) 
{
    console.log("Error: " + e);
}

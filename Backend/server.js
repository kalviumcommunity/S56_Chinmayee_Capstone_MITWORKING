require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use("/", routes)

const PORT = process.env.PORT || 3000

if (require.main === module) {
    app.listen(PORT, (err) => {
        if (err) console.error(err);
        else console.log(`server running on PORT: ${PORT}`);
    });
}
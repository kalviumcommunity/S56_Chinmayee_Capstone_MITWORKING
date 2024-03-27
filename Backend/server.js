const express = require('express');
const routes = require('./routes')

const app = express();
app.use(express.json());
app.use("/", routes)


if (require.main === module) {
    app.listen(3000, (err) => {
        if (err) console.error(err);
        else console.log(`server running on PORT: 3000`);
    });
}
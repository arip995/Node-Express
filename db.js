const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

async function startDatabase() {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error)
    }
}

module.exports = startDatabase;

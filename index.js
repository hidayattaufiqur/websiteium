const { database } = require("./config/");
const { startServer } = require("./entry-points/server.js");

async function entry() {
  try {
    await database.authenticate().then(() => {
      console.log("database connected");
    });
    startServer();
  } catch (error) {
    console.log(error.message);
  }
}

entry();
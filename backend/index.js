const app = require("./src/app");
const pool = require("./src/services/db");

const PORT = 3000;

pool.query("SELECT 1", (error) => {
    if (error) {
        console.error("Database connection failed:", error.message);
        return;
    }

    console.log("Database connected successfully");

    app.listen(PORT, () => {
        console.log(`App listening to port ${PORT}`);
    });
});
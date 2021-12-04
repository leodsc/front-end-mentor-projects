import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const path =
	new URL("./", import.meta.url).pathname + process.env.STATS_PREVIEW;
console.log(path);

const PORT = process.env.PORT | 3000;

app.use(express.static(path + "/public"));

app.listen(PORT, () => {
	console.log("running on port " + PORT);
});
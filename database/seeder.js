import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import Bootcamp from "../models/Bootcamp.js";

dotenv.config({ path: "./.env" });

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const __dirname = process.cwd(); // Se define la ubicacion general del directorio ya que por default __dirname no existe en ES7
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

/**
 * Function to import data into DB
 * Para que funcione se corre el comando node database/seeder -i
 */
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

/**
 * Function to delete data into DB
 * Para que funcione se corre el comando node database/seeder -d
 */
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}

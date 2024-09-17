import User from "../../src/user/user-schema.model";
import { connectDB } from "../../helper/connectDB.helper";
import { comments } from "../comments/comments";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
const bcrypt = require("bcrypt");

const insertUsers = async () => {
  try {
    await connectDB();
    for (let comment of comments) {
      const salt = await bcrypt.genSalt(10);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(comment.user_id),
        username: faker.internet.userName(),
        password: await bcrypt.hash(faker.internet.password(), salt),
        email: faker.internet.email(),
      });
      await newUser.save();
      console.log(`Inserted: ${newUser}`);
    }
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

insertUsers();

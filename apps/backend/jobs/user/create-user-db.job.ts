import User from "../../model/user-schema.model";
import { connectDB } from "../../helper/connectDB.helper";
import { comments } from "../comments/comments";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

const insertUsers = async () => {
  try {
    await connectDB();
    for (let comment of comments) {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(comment.user_id),
        username: faker.internet.userName(),
        password: faker.internet.password(),
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

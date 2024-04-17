import Users from "@models/Users";
import { connectToDatabase } from "@mongodb";
import { hash } from "bcryptjs";

export const POST = async (req, res, next) => {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { userName, email, password } = body;

    const isUserExisting = await Users.findOne({ email });
    if (isUserExisting) {
      return new Response("User already exists", { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await Users.create({
      email,
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to create new user", { status: 500 });
  }
};

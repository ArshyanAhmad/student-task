import { User, Task } from "../models/models.js";
import { userSignUp, userSignIn, TaskSchema } from "../types/types.js";

export const UserRegister = async (req, res) => {
   try {
      const success = userSignUp. userSignIn,safeParse(req.body);

      if (!success.success) {
         return res.status(400).json({
            success: false,
            message: "Invalid user credentials",
            errors: success.error,
         });
      }

      const { username, email, password } = success.data;

      const userExist = await User.findOne({ email }).lean();

      if (userExist) {
         return res.status(400).json({
            success: false,
            message: "User already exist with this email",
         });
      }

      const user = await User.create({
         username,
         email,
         password,
      });

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
         expiresIn: "7d",
      });

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.setHeader("Authorization", `Bearer ${token}`);

      const userData = {
         userId: user._id,
         username: user.username,
         email,
      };

      res.status(201).json({
         success: true,
         data: userData,
         message: "User created successfully",
      });
   } catch (error) {
      console.log("Error: ", error.message);
      return res.status(500).json({
         success: false,
         message: "User registration failed",
      });
   }
};

export const UserSignin = async (req, res) => {
   try {
      const result = userSignIn.safeParse(req.body);

      if(!result.success){
            return res.status(400).json({
            success: false,
            message: "Invalid user credentials",
            errors: result.error,
         });
      }

      const {email, password} = result.data;

      const user = await User.findOne({email}).lean();

      if(!user){
         return res.status(400).json({
            success: false,
            message: "User doesn't exist with this email"
         })
      }

      const isMatch = await User.isPasswordCorrect(password);
      if(!isMatch){
         return res.status(401).json({
            success: false,
            message: "Invalid email or password"
         })
      }

      const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "24h"});

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.setHeader("Authorization", `Bearer ${token}`);

      return res.status(200).json({
         message: "Signin successful",
         user: {
            id: user._id,
            email: user.email,
         },
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Internal server error"
      })

   }
};

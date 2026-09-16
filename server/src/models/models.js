import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         trim: true,
         minlength: 3,
      },

      email: {
         type: String,
         required: true,
         trim: true,
         unique: true,
      },

      password: {
         type: String,
         required: true,
         minlength: 6,
         maxlength: 10,
      },
   },
   {
      timestamps: true,
   },
);

const TaskSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
      },

      subject: {
         type: String,
         required: true,
         trim: true,
      },

      description: {
         type: String,
         trim: true,
      },

      dueDate: {
         type: Date,
         required: true,
      },

      priority: {
         type: String,
         required: true,
         enum: ["low", "medium", "high"],
         default: "medium",
      },

      status: {
         type: String,
         required: true,
         enum: ["pending", "in-progress", "completed"],
         default: "pending",
      },

      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   {
      timestamps: true,
   },
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   try {
      const hashedPassword = await bcryptjs.hash(this.password, 10);
      this.password = hashedPassword;
      next();
   } catch (error) {
      next(error);
   }
});

userSchema.methods.isPasswordCorrect = async function (password) {
   try {
      return await bcryptjs.compare(password, this.password);
   } catch (error) {
      console.error("Error while comparing passwords:", error);
      return false;
   }
};

export const User = mongoose.model("User", userSchema);
export const Task = mongoose.model("Task", TaskSchema);

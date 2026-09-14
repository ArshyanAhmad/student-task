import { app } from "./index.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 8080;

connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log("Server is listening on PORT at: ", PORT);
      });
   })
   .catch((e) => {
      console.log(e.message);
   });

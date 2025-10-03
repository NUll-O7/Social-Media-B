import express from "express";
import { uploadPost , getAllPosts , like } from "../controllers/post.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload} from "../middlewares/multer.js";
const postRouter = express.Router();

postRouter.post("/upload", isAuth, upload.single("mediaUrl"), uploadPost);
postRouter.get("/getAllPosts" , isAuth ,getAllPosts );
postRouter.post("/like/:postId", isAuth, like)

export default postRouter;

import express from "express";
import AuthController from "../controllers/auth";
const router = express.Router();

router.post('/google-login',AuthController.googleLogin);
router.post('/fb-login',AuthController.facebookLogin);
router.post('/slack-login',AuthController.slackLogin);
router.get('/twitter-request-token',AuthController.twitterTokenRequest);
router.post('/twitter-access-token',AuthController.twitterAccessToken);

export default router;
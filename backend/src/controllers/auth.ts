import { Response, Request, response } from 'express';
import { OAuth2Client } from 'google-auth-library'
import { messages } from '../common/message';
import { failure, success } from '../common/Response';
import { status_code } from '../common/statusCode';
import Validator from 'validatorjs'
import fetch from 'node-fetch';
import { WebClient } from '@slack/web-api';
import oauth from 'oauth';
import request from 'request';
const util = require('util');
const post = util.promisify(request.post);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const clientForSlack = new WebClient();


class AuthController {
    async googleLogin(req: Request, res: Response) {
        try {
            const rule = {
                code: 'required'
            }
            const validation = new Validator(req.body, rule);
            if (validation.fails()) {
                return res
                    .status(status_code.HTTP_OK)
                    .send(failure(messages.ValidationError, validation.errors.all()))
            }
            const code = req.body.code;
            const getAccessTokenUrl = `https://oauth2.googleapis.com/token`;
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const clientSecret = process.env.GOOGLE_CLIENT_SERET_ID;
            const redirectUri = process.env.GOOGLE_REDIRECT_URL;
            const response = await fetch(getAccessTokenUrl, {
                method: 'POST',
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri,
                    grant_type: 'authorization_code',
                    code: code
                })
            })
            const token = await response.json();
            if (token?.error || !token) {
                return res
                    .status(status_code.HTTP_OK)
                    .send(failure(token?.error_description || messages.ServerError))
            }
            const userInfoUrl: any = 'https://www.googleapis.com/oauth2/v2/userinfo';
            const result = await fetch(userInfoUrl, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token?.access_token}` }
            });
            const data = await result.json();
            return res
                .status(status_code.HTTP_OK)
                .send(success(messages.LoginSuccessful, data))

        } catch (error) {
            return res
                .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                .send(failure(messages.ServerError, error))
        }
    }
    async facebookLogin(req: Request, res: Response) {
        try {
            const rule = {
                code: 'required'
            }
            const validation = new Validator(req.body, rule);
            if (validation.fails()) {
                return res
                    .status(status_code.HTTP_OK)
                    .send(failure(messages.ValidationError, validation.errors.all()))
            }
            const code = req.body.code;
            const getAccessTokenUrl = `https://graph.facebook.com/v4.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET_ID}&redirect_uri=${process.env.REDIRECT_URL}&code=${code}`
            console.log(getAccessTokenUrl)
            const response_one = await fetch(getAccessTokenUrl);
            const tokenInfo = await response_one.json();
            if (tokenInfo?.error || !tokenInfo) {
                return res
                    .status(status_code.HTTP_OK)
                    .send(failure(tokenInfo.error.message))
            }
            const getUserDataUrl = `https://graph.facebook.com/me?access_token=${tokenInfo.access_token}&fields=id,email,name,picture`;
            const response_two = await fetch(getUserDataUrl);
            const userInfo = await response_two.json();
            if (!userInfo) {
                return res
                    .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                    .send(failure(messages.ServerError))
            }
            return res
                .status(status_code.HTTP_OK)
                .send(success(messages.LoginSuccessful, userInfo))

        } catch (error) {
            return res
                .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                .send(failure(messages.ServerError, error))
        }
    }
    async slackLogin(req: Request, res: Response) {
        try {
            const clientId: any = process.env.SLACK_CLIENT_ID;
            const clientSecret: any = process.env.SLACK_CLIENT_SECRET_ID;
            const redirectUri: any = process.env.SLACK_CLIENT_SECRET_ID;
            const auth = await clientForSlack.oauth.v2.access({
                code: req.body.code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: ''
            });
            if (!auth) {
                return res
                    .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                    .send(failure(messages.ServerError))
            }
            const response = await fetch('https://slack.com/api/users.identity', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${auth.authed_user?.access_token}` }
            });
            const data = await response.json();
            return res
                .status(status_code.HTTP_OK)
                .send(success(messages.LoginSuccessful, data))

        } catch (error) {
            return res
                .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                .send(failure(messages.ServerError, error))
        }
    }
    async twitterTokenRequest(req: Request, res: Response) {
        try {
            const twitterConsumerkey: any = process.env.TWITTER_API_KEY;
            const twitterConsumerSecret: any = process.env.TWITTER_API_SECRET_KEY;
            const twitterCallBackUrl: any = process.env.TWITTER_REDIRECT_URL;
            
            const consumer = new oauth.OAuth(
                "https://twitter.com/oauth/request_token",
                "https://twitter.com/oauth/access_token",
                twitterConsumerkey,
                twitterConsumerSecret,
                "1.0A", twitterCallBackUrl,
                "HMAC-SHA1"
            );
            consumer.getOAuthRequestToken(async function (error: any, oauthToken: any, oauthTokenSecret: any, results: any) {
                if (error) {
                    return res
                        .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                        .send(failure(messages.ServerError, error))
                } else {
                    return res.send({
                        oauthRequestToken: oauthToken,
                        oauthRequestTokenSecret: oauthTokenSecret,
                        results,
                        twitterLoginUrl: `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
                    })
                }
            })
        } catch (error) {
            return res
                .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                .send(failure(messages.ServerError, error))
        }
    }
    async twitterAccessToken(req: Request, res: Response) {
        try {
            const twitterConsumerkey: any = process.env.TWITTER_API_KEY;
            const twitterConsumerSecret: any = process.env.TWITTER_API_SECRET_KEY;
            const twitterCallBackUrl: any = process.env.TWITTER_REDIRECT_URL;

            const consumer = new oauth.OAuth(
                "https://twitter.com/oauth/request_token",
                "https://twitter.com/oauth/access_token",
                twitterConsumerkey,
                twitterConsumerSecret,
                "1.0A", twitterCallBackUrl,
                "HMAC-SHA1"
            );
            consumer.getOAuthAccessToken(
                req.body.oauth_token,
                req.body.oauthRequestTokenSecret,
                req.body.oauth_verifier,
                function (error: any, oauthAccessToken: any, oauthAccessTokenSecret: any, results: any) {
                    if (error) {
                        return res
                            .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                            .send(failure(messages.ServerError, error))
                    } else {
                        return res.send({
                            oauthAccessToken,
                            oauthAccessTokenSecret,
                            results
                        })
                    }
                })
        } catch (error) {
            return res
                .status(status_code.HTTP_INTERNAL_SERVER_ERROR)
                .send(failure(messages.ServerError, error))
        }
    }
}

export default new AuthController();
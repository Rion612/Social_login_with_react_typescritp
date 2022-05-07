import "./App.css";
import GoogleLogin from "react-google-login";
import * as queryString from "query-string";
import FacebookLogin from "react-facebook-login";
// import { useNavigate } from "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Container/Home";
function App() {
  // let navigate = useNavigate();
  const paramsForFB = queryString.stringify({
    client_id: "302650715385015",
    redirect_uri: "https://localhost:3000/",
    scope: ["email", "user_friends"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });
  const googleParams = queryString.stringify({
    client_id:
      "439083168849-es1vp4sv2k1v9g9pa6d6mlb8g3hqdfqb.apps.googleusercontent.com",
    redirect_uri: "https://localhost:3000",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "), // space seperated string
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  const paramsForSlack = queryString.stringify({
    client_id: "3457754680432.3419446620199",
    user_scope: ["identity.basic", "identity.avatar", "identity.email"].join(
      ","
    ),
    redirect_uri: "https://localhost:3000",
  });

  const facebookLoginUrl = `https://www.facebook.com/v13.0/dialog/oauth?${paramsForFB}`;
  const slackLoginUrl = `https://slack.com/oauth/v2/authorize?${paramsForSlack}`;
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${googleParams}`;
  const twitterLoginUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=pJgZ1AAAAAABb7_5AAABgGpJnwU`;
  const handleLogin = async () => {
    console.log("Hello");
    // return navigate('/hello')
    // const res = await fetch("/api/v1/auth/google", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     token: googleData.tokenId,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await res.json();
  };
  // const responseFacebook = () => {};
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    // >
    //   {/* <div>
    //     <GoogleLogin
    //       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    //       buttonText="Google"
    //       onSuccess={handleLogin}
    //       onFailure={handleLogin}
    //       cookiePolicy={"single_host_origin"}
    //     />
    //   </div> */}
    //   <div
    //     style={{
    //       marginLeft: "10px",
    //       boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    //       transition: "0.3s",
    //       padding: "10px",
    //     }}
    //   >
    //     <img
    //       src={process.env.PUBLIC_URL + "/google.png"}
    //       height="20px"
    //       width="20px"
    //     />
    //     <a
    //       href={googleLoginUrl}
    //       style={{
    //         textDecoration: "none",
    //         color: "grey",
    //         paddingLeft: "10px",
    //         paddingTop: "0",
    //       }}
    //     >
    //       Google
    //     </a>
    //   </div>
    //   <div
    //     style={{
    //       marginLeft: "10px",
    //       boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    //       transition: "0.3s",
    //       padding: "10px",
    //     }}
    //   >
    //     {/* <FacebookLogin
    //       appId="302650715385015"
    //       autoLoad={false}
    //       fields="name,email,picture"
    //       callback={responseFacebook}
    //       cssClass="my-facebook-button-class"
    //       icon="fa-facebook"
    //     /> */}
    //     <img
    //       src={process.env.PUBLIC_URL + "/facebook.png"}
    //       height="20px"
    //       width="20px"
    //     />
    //     <a
    //       href={facebookLoginUrl}
    //       style={{
    //         textDecoration: "none",
    //         color: "grey",
    //         paddingLeft: "10px",
    //         paddingTop: "0",
    //       }}
    //     >
    //       Facebook
    //     </a>
    //   </div>
    //   <div
    //     style={{
    //       marginLeft: "10px",
    //       boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    //       transition: "0.3s",
    //       padding: "10px",
    //     }}
    //   >
    //     <img
    //       src={process.env.PUBLIC_URL + "/slack.png"}
    //       height="20px"
    //       width="20px"
    //     />
    //     <a
    //       href={slackLoginUrl}
    //       style={{
    //         textDecoration: "none",
    //         color: "grey",
    //         paddingLeft: "10px",
    //         paddingTop: "0",
    //       }}
    //     >
    //       Slack
    //     </a>
    //   </div>
    //   <div
    //     style={{
    //       marginLeft: "10px",
    //       boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    //       transition: "0.3s",
    //       padding: "10px",
    //       cursor:'pointer'
    //     }}
    //   >
    //     <img
    //       src={process.env.PUBLIC_URL + "/slack.png"}
    //       height="20px"
    //       width="20px"
    //     />
    //     <a
    //       // href={twitterLoginUrl}
    //       onClick={handleLogin}
    //       style={{
    //         textDecoration: "none",
    //         color: "grey",
    //         paddingLeft: "10px",
    //         paddingTop: "0",
    //       }}
    //     >
    //       Twitter
    //     </a>
    //   </div>
    // </div>
  );
}

export default App;

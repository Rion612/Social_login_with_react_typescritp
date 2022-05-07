
import SocialButton from "../Component/SocialButton";
import axiosInstance from "../Helpers/helper";


const Home = () => {
    const clickOnTwitter = async ()=>{
        const response = await axiosInstance.get('/auth/twitter-request-token');
        if(response.status === 200){
            console.log(response)
            localStorage.setItem('twiiter-req',JSON.stringify(response.data.oauthRequestTokenSecret))
            window.location.href= response.data.twitterLoginUrl;
        }
        else {
            console.log(response)
        }
    }
  return (
    <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <SocialButton name="Google" image='/google.png'/>
      <SocialButton name="Twitter" image='/twitter.png' onClick={clickOnTwitter}/>
      <SocialButton name="Facebook" image='/facebook.png'/>
      <SocialButton name="Slack" image='/slack.png'/>
    </div>
  );
};
export default Home;

import React , {useEffect , useState} from "react";
import { redirect } from "next/navigation";
import Cookies from "universal-cookie"; 
  
const ProtectedRoute = () => {
    const cookie = new Cookies();
    const [accessToken , setAccessToken] = useState(cookie.get('accessToken'));
    const [isRefreshing , setIsRefreshing] = useState(false)
    const tokenExpireTime = cookie.get('expiresIn');
    const refershToken = cookie.get('refreshToken');

    const redirectToLogin = () =>  false;

    const refreshAccessToken = async () => {
      if(refershToken){
      try{
            setIsRefreshing(true)
            cookie.set("accessToken" , null);
            cookie.set("refreshToken" , null);
            cookie.set('expiresIn' , null)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/refreshAccessToken` , {
              method : "POST", 
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify({refershToken})
            })

            const responseData =  await response.json()
            const {accessToken ,refreshToken } = responseData;
            setAccessToken(accessToken)
            cookie.set("accessToken" , accessToken);
            cookie.set("refreshToken" , refreshToken);
            cookie.set('expiresIn' , JSON.stringify(new Date(Date.now() + 60 * 1000)))
            setIsRefreshing(false)
        }catch(err){
          redirectToLogin();
        }
      }
    }

    useEffect(() => {
      if(tokenExpireTime && new Date().getTime() > new Date(tokenExpireTime).getTime()){
        refreshAccessToken();
      }
    }, [tokenExpireTime]);


    if (!accessToken) {
      return redirectToLogin();
    }
   
  return true
}

export default ProtectedRoute;
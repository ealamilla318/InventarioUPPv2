import { useCallback, useContext,useState } from 'react';
import Context from "../context/UserContext";
import loginService from "../services/login";

export default function useUser() {
  const { jwt, setJWT } = useContext(Context);
  const [state,setState] = useState({loading:false,error:false});
  
  
  const login = useCallback(({correoUsuario, passwordUsuario}) => {
      setState({loading: true, error:false});
      loginService({
        correoUsuario,
        passwordUsuario,
      }).then((jwt) => {
        setState({loading: false, error:false});
        console.log(jwt);
        setJWT("jwt");
      })
      .catch((err) => {
        setState({loading: false, error:true});
        console.error(err)
      })
    },[setJWT])

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  return {
    token:  jwt,
    isLoggedIn: Boolean(jwt),
    isLoginLoading : state.loading,
    isLoginError : state.error,
    login,
    logout,
  };
}

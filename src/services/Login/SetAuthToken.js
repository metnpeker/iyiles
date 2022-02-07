import axios from 'axios';

const setAuthToken = token => {
  const authToken = localStorage.getItem('jwtToken');
   if(token){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
   }else if(authToken){
      axios.defaults.headers.common['Authorization'] = 'Bearer '+authToken;
   }else{
      // Sil
      delete axios.defaults.headers.common['Authorization'];
   }
}

export default setAuthToken;

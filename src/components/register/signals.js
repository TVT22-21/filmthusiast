import { effect, signal } from "@preact/signals-react";
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:3001';

export const jwtToken = signal(getSessionToken());

export const userInfo = signal(null);

function getSessionToken(){
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}

effect(()=>{
    sessionStorage.setItem('token', jwtToken.value);

    if(jwtToken.value.length > 0){
        const config = {headers: {Authorization: 'Bearer' + jwtToken.value}}
        axios.get('/login/private', config)
            .then(resp => userInfo.value = resp.data)
            .catch(err => console.log(err.response.data))
    }
});

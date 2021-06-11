import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
const [githubUser,setGithubUser] = useState(mockUser)
const [githubRepos,setGithubRepos] = useState(mockRepos)
const [githubFollowers,setGithubFollowers] = useState(mockFollowers)

//request loading
const [request,setRequest] = useState(0);
const [loading,setIsLoading] = useState(false);
const [error,setIserror] = useState({show:false,msg:""});

const searchGithubUser =  async(user) => {
toggleError();
setIsLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`)
    .catch(err=>console.log(err))
console.log(response);
    if(response)
    {
        setGithubUser(response.data);
        const {login,followers_url} = response.data
       
    await Promise.allSettled([await axios(`${rootUrl}/users/${login}/repos?per_page=100`),axios(`${followers_url}?per_page=100`)])
    .then((results)=>{
        console.log(results);
        const [repos,followers] = results;
        const status = "fulfilled";
        if(repos.status = status)
        {
            setGithubRepos(repos.value.data)
        }
        if(followers.status = status)
        {
            setGithubFollowers(followers.value.data)
        }
    })
    
    }
    else{
        toggleError(true,"there is no user with the username")
    }

    checkRequest()
    setIsLoading(false)
}

//check rate
const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`).then(({data})=>{
let {rate:{remaining}} = data;
setRequest(remaining)

if(remaining == 0)
{
    //throw an error
    toggleError(true,"sorry you have exceeded you hourly rate limit! ")
}

    }).catch((err)=> console.log(err))
};

function toggleError(show = false,msg = ""){
    setIserror({show,msg})
}


//error
useEffect(checkRequest,[])


return <GithubContext.Provider value={{githubFollowers,githubRepos,githubUser,error,request,loading,searchGithubUser}}>
        {children}
    </GithubContext.Provider>
}

export {GithubProvider,GithubContext}
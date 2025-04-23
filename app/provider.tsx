"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import {UserDetailContext} from '../context/UserDetailContext'

const Provider = ({children}: {children: React.ReactNode}) => {
    const user = useUser();
    const createNewUserMutation = useMutation(api.users.CreateNewUser);
    const [userDetail,setUserDetail] = useState({})
    useEffect(() => {
        user&&CreateUser();
    }, [user]);

    const CreateUser = async ()=>{
        const data ={
            name: user?.displayName||'',
            email: user?.primaryEmail||'',
            picture: user?.profileImageUrl||''
        }
        const result = await createNewUserMutation({...data})
        setUserDetail(result)
    }

    return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>{children}</UserDetailContext.Provider></div>
  )
}

export default Provider
import { DATABASE_URL } from "./env";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"

export function db() {
  const [loading, setLoading] = useState(false);
  const {session} = useAuth()

  async function request<T>(
    endpoint: string,
    payload?: any,
    method: string = "GET"
  ): Promise<T | null> {
    setLoading(true)
    console.log("from db request",session?.authToken)
    try {
      const res = await fetch(`${DATABASE_URL}/api/v1${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${session?.authToken}`
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });

      if(!res.ok){
        const data = await res.json();
        console.log(data,"from db")
      return data
      }
      const data = await res.json();
      console.log(data)
      return data
    } catch (error) {
      console.log(error?.message,"from db request")
      return error
    } finally{
        setLoading(false)
    }
  }

  async function getApplications() {
    try {
        const res = await request('/applications')
        return res
    }catch (error) {
        console.log(error)
        return error
    } finally{
        setLoading(false)
    }
  }

  async function getApplication(slug:string){
    try {
        const res = await request(`/applications/${slug}`)
        return res
    }catch (error) {
        console.log(error)
        return error
    } finally{
        setLoading(false)
    }
  }


  return {
    loading,
    request,
    getApplications,
    getApplication
  };
}

import { DashboardLayout } from "@/components/DashboardLayout";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


import { db } from "@/lib/db"
import { useEffect, useState } from "react";


export default function Applications() {
    const { loading, getApplications } = db()
    const [data,setData] = useState<any | null>(null)
    const fetchData = async() =>{
      const res = await getApplications()
      setData(res)
    }
  
    useEffect(() => {
      fetchData();
    }, [])
    
    if(loading) return <p>Loading</p>
  return (
    <DashboardLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your backend applications and services</p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data ? data.map((app) => (
            <ApplicationCard 
              key={app.id}
              name={app.name}
              status={app.isActive ? "active" : "inactive"}
              requests="245K/day"
              uptime="99.9%"
              lastDeployed={app.updatedAt} 
              slug={app.slug}            />
          )) : "Data Not Found"}
        </div>
      </div>
    </DashboardLayout>
  );
}

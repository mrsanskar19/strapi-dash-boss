import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Server } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CollectionCard } from "@/components/CollectionCard";
import { Card,CardContent,CardDescription,CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/Loading";

import { db } from "@/lib/db"
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";



export default function ApplicationView() {
    const { loading, getApplication } = db()
    const { slug } = useParams();
    const [data,setData] = useState<any | null>(null)
    const statusColors = {
      active: "bg-success text-success-foreground",
      inactive: "bg-muted text-muted-foreground",
      error: "bg-destructive text-destructive-foreground",
    };
    const fetchData = async() =>{
      const res = await getApplication(slug)
      console.log(res)
      setData(res)
    }
  
    useEffect(() => {
      fetchData();
    }, [])
    
    if(loading) return <Loading/>
  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold text-foreground">{data?.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">{data?.description}</CardDescription>
          </div>
        
          </CardHeader>
          <CardContent>
          <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard title={"Status"} value={"Active"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant={"primary"}/>
            <StatCard title={"Total Collections"} value={"2"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant={"danger"}/>
            <StatCard title={"Draft Collection"} value={"0"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant="warning"/>
            <StatCard title={"Total Rows"} value={"200"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant="success"/>
          </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Collections</h2>
        <Link to={`/app/${slug}/collections`}><Button variant="ghost" size="sm">View All</Button></Link>
        </div>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <CollectionCard name={"Testing Collection"} status={"active"} requests={"17"} lastDeployed={"19-10-2025 8:29"} slug={slug} CollectionSlug={"testingCollection"}/>
        </div>
        </CardContent>
        </Card>
      </div>
    </>
  );
}

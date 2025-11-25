import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ApplicationCard } from "@/components/ApplicationCard";
import { DatabaseTable } from "@/components/DatabaseTable";
import { Server, Database, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Loading } from "@/components/Loading";
import { Link } from "react-router-dom";

import { db } from "@/lib/db"
import { useEffect, useState } from "react";
import { FormWrapper } from "@/forms/FormWrapper";
import { ApplicationForm } from "@/forms/ApplicationForm";

const Index = () => {
  const { loading, getApplications } = db()
  const [data, setData] = useState<any | null>(null)
  const fetchData = async () => {
    const res = await getApplications()
    setData(res)
    console.log(res)
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <div className="space-y-4 md:space-y-6">        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitor and manage your backend infrastructure</p>
          </div>
          <div className="flex items-center gap-2">
          <FormWrapper
  title="Create New Application"
  description="Give your new application a name and a description."
  trigger={
    <Button>
      <Plus className="h-4 w-4" />
      New Application
    </Button>
  }
  size="lg"
>
  <ApplicationForm />
</FormWrapper>

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={1}
            icon={Server}
            trend={{ value: "+2 this month", isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Database Uase"
            value={"200MB"}
            icon={Database}
            trend={{ value: "+5 this week", isPositive: true }}
            variant="success"
          />
          <StatCard
            title="API Requests"
            value="1.2K"
            icon={Activity}
            trend={{ value: "+12% from last month", isPositive: true }}
            variant="warning"
          />
          <StatCard
            title="Active Time"
            value="10 Hr"
            icon={TrendingUp}
            trend={{ value: "Stable", isPositive: true }}
            variant="danger"
          />
        </div>

        {/* Applications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Applications</h3>
            <Link to="/applications"><Button variant="ghost" size="sm">View All</Button></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {data ?
              data?.map((app) => (
                <ApplicationCard
                  key={app?.id}
                  app={app}
                />
              ))
              : "No Data Found"}
          </div>
        </div>

        {/* Database Tables Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Database Tables</h3>
            <Button variant="ghost" size="sm" className="text-sm">Manage All</Button>
          </div>
          <DatabaseTable />
        </div>
      </div>
    </>
  );
};

export default Index;

import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { ApplicationCard } from "@/components/ApplicationCard";
import { DatabaseTable } from "@/components/DatabaseTable";
import { Server, Database, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Loading } from "@/components/Loading";

import { db } from "@/lib/db"
import { ApplicationForm } from "@/components/forms/Application"
import { ConfirmActionAlert } from "@/components/forms/ConfirmActionAlert";
import { useEffect, useState } from "react";
import { FormWrapper,Title } from "@/components/forms/FormWrapper";

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
        <FormWrapper onClose={function (): void {
          throw new Error("Function not implemented.");
        }}><ApplicationForm /></FormWrapper>
        <ConfirmActionAlert onConfirm={function (): void {
          throw new Error("Function not implemented.");
        }} title={"Delete Database"} description={""} actionText={"delete"} confirmationPhrase={"sudo delete database"}>Delect Application</ConfirmActionAlert>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">Monitor and manage your backend infrastructure</p>
          </div>
          <FormWrapper className="gap-2 w-full sm:w-auto" onClose={function (): void {
            throw new Error("Function not implemented.");
          }} title={
          <Title>
          <Plus className="h-4 w-4" />
            New Application
          </Title>
          }>
            <ApplicationForm />
          </FormWrapper>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applications"
            value={12}
            icon={Server}
            trend={{ value: "+2 this month", isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Database Tables"
            value={48}
            icon={Database}
            trend={{ value: "+5 this week", isPositive: true }}
            variant="success"
          />
          <StatCard
            title="API Requests"
            value="1.2M"
            icon={Activity}
            trend={{ value: "+12% from last month", isPositive: true }}
            variant="warning"
          />
          <StatCard
            title="Uptime"
            value="99.9%"
            icon={TrendingUp}
            trend={{ value: "Stable", isPositive: true }}
            variant="success"
          />
        </div>

        {/* Applications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Applications</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {data ?
              data?.map((app) => (
                <ApplicationCard
                  key={app?.id}
                  slug={app?.slug}
                  name={app?.name}
                  status={app?.isActive ? "active" : "inactive"}
                  requests="245K/day"
                  uptime="99.9%"
                  lastDeployed={app?.updatedAt}
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

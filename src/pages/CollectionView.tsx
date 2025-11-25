
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { Plus, Server } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const CollectionPage = () => {


  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Collections</CardTitle>
            <CardDescription>Manage your collections.</CardDescription>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Application
          </Button>
        
          </CardHeader>
          <CardContent>
          <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard title={"Status"} value={"Active"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant={"primary"}/>
            <StatCard title={"Total Collections"} value={"2"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant={"primary"}/>
            <StatCard title={"Total Collections"} value={"2"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant={"primary"}/>
            <StatCard title={"Total Collections"} value={"2"} icon={Server} trend={{value:"+2 this month",isPositive:true}} variant={"primary"}/>
          </div>
          </CardContent>
      </Card>

      <DataTable/>
    </div>
  );
};

export default CollectionPage;

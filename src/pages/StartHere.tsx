import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Server, Database, Code } from "lucide-react";
import { Link } from "react-router-dom";

export default function StartHere() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome to Backend Hub!</h1>
        <p className="text-lg text-muted-foreground mt-2">Your central place for managing backend resources.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Getting Started Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Step 1: Create Your First Application</h3>
              <p className="text-muted-foreground">Applications are the core of your projects. Each application has its own database and API.</p>
              <Link to="/applications">
                <Button variant="link" className="px-0">Go to Applications <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Step 2: Set Up Your Database</h3>
              <p className="text-muted-foreground">Create collections and manage your data with our easy-to-use database interface.</p>
              <Link to="/database">
                <Button variant="link" className="px-0">Explore the Database <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Step 3: Explore the API</h3>
              <p className="text-muted-foreground">Interact with your data using our automatically generated REST API endpoints.</p>
              <Link to="/api">
                <Button variant="link" className="px-0">View API Docs <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground">Ready to experiment? Head over to the Playground!</p>
        <Link to="/playground">
          <Button className="mt-2">Go to Playground <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </div>
    </div>
  );
}

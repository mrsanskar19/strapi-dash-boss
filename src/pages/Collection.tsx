
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CollectionForm } from "@/components/forms/Collection";
import { DataTable } from "@/components/DataTable";

const CollectionPage = () => {


  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Collections</CardTitle>
            <CardDescription>Manage your collections.</CardDescription>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Add Collection</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Collection</SheetTitle>
                <SheetDescription>
                  Create a new collection to store your data.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <CollectionForm />
              </div>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <DataTable/>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionPage;

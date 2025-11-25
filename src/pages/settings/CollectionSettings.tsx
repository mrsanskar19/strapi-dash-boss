import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const CollectionSettings = () => {
  const [colName, setColName] = useState("");
  const [schema, setSchema] = useState("");

  const handleSaveChanges = () => {
    console.log("Saving changes:", { colName, schema });
  };

  const handleDeactivateCollection = () => {
    console.log("Deactivating collection...");
  };

  const handleDeleteCollection = () => {
    console.log("Deleting collection...");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Collection Settings</CardTitle>
          <CardDescription>Manage your collection settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="colName">Collection Name</Label>
            <Input
              id="colName"
              value={colName}
              onChange={(e) => setColName(e.target.value)}
              placeholder="Enter your collection name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schema">Schema</Label>
            <Textarea
              id="schema"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder="Enter your collection schema"
              rows={10}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            These actions are irreversible. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-destructive p-4">
            <div>
              <h3 className="font-semibold">Deactivate Collection</h3>
              <p className="text-sm text-muted-foreground">
                Deactivating the collection will make it inaccessible.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Deactivate</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deactivating this collection will make it temporarily
                    inaccessible. You can reactivate it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeactivateCollection}>
                    Deactivate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-destructive p-4">
            <div>
              <h3 className="font-semibold">Delete Collection</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete this collection and all its data.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the collection and all its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteCollection}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollectionSettings;

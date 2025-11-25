import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const teamMembers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Owner",
    avatar: "/avatars/01.png",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Developer",
    avatar: "/avatars/02.png",
  },
  {
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    role: "Viewer",
    avatar: "/avatars/03.png",
  },
];

const Teams = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
        <CardDescription>Manage your team members and their roles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Invite a new member</h3>
          <div className="flex space-x-4">
            <Input type="email" placeholder="Enter email address" className="flex-1" />
            <Button>Send Invite</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Team Members</h3>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={member.role.toLowerCase()}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Teams;

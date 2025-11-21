
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { get, post, patchRequest, deleteRequest } from "@/lib/api";
import { Play, Loader2, Plus, Trash2 } from "lucide-react";

export default function Playground() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("/users"); // Example URL
  const [headers, setHeaders] = useState([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse(null);
    try {
      let res;
      const requestHeaders = headers.reduce((acc, header) => {
        if (header.key) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {} as Record<string, string>);

      // We are assuming the api functions from /lib/api handle the base URL and auth tokens
      switch (method) {
        case "POST":
          res = await post(url, JSON.parse(body));
          break;
        case "PATCH":
          res = await patchRequest(url, JSON.parse(body));
          break;
        case "DELETE":
          res = await deleteRequest(url);
          break;
        case "GET":
        default:
          res = await get(url);
          break;
      }
      setResponse({ status: "Success", data: res });
    } catch (error: any) {
        setResponse({ status: "Error", data: { message: error.message, ...error } });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
       <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">API Playground</h2>
          <p className="text-sm text-muted-foreground mt-1">Construct and test your API requests in real-time.</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Request Panel */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="/v1/users"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button onClick={handleSendRequest} disabled={loading} className="w-[120px]">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Play className="h-4 w-4 mr-2" /> Send</>}
              </Button>
            </div>

            <Tabs defaultValue="body">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
              </TabsList>
              <TabsContent value="body">
                <Textarea
                  placeholder="Request body..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="h-64 mt-2 font-mono text-sm"
                  disabled={method === "GET" || method === "DELETE"}
                />
              </TabsContent>
              <TabsContent value="headers">
                <div className="space-y-2 mt-2">
                  {headers.map((header, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Key"
                        value={header.key}
                        onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                      />
                      <Input
                        placeholder="Value"
                        value={header.value}
                        onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveHeader(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleAddHeader} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" /> Add Header
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Response Panel */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            {response ? (
              <div>
                <p className={`font-bold ${response.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
                  Status: {response.status}
                </p>
                <pre className="h-96 mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto text-sm font-mono">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Response will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

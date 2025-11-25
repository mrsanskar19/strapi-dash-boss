import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Server } from 'lucide-react';

// --- Types ---
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Param {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Endpoint {
  method: Method;
  path: string;
  summary: string;
  params?: Param[]; // Query or Body params
}

interface CollectionDocs {
  name: string;
  slug: string;
  endpoints: Endpoint[];
}

// --- Mock Data (Replace with your API data) ---
const mockApiData: CollectionDocs[] = [
  {
    name: 'Products Collection',
    slug: 'products',
    endpoints: [
      { method: 'GET', path: '/api/v1/products', summary: 'List all products', params: [{ name: 'limit', type: 'number', required: false, description: 'Max items' }] },
      { method: 'GET', path: '/api/v1/products/:id', summary: 'Get single product', params: [] },
      { method: 'POST', path: '/api/v1/products', summary: 'Create product', params: [{ name: 'title', type: 'string', required: true, description: 'Product name' }] },
    ]
  },
  {
    name: 'Users Collection',
    slug: 'users',
    endpoints: [
      { method: 'DELETE', path: '/api/v1/users/:userId/active', summary: 'Deactivate user', params: [] },
    ]
  }
];

// --- Helper Components ---

// 1. Method Badge
const MethodBadge = ({ method }: { method: Method }) => {
  const colors = {
    GET: 'bg-green-100 text-green-700 border-green-200',
    POST: 'bg-blue-100 text-blue-700 border-blue-200',
    PUT: 'bg-orange-100 text-orange-700 border-orange-200',
    DELETE: 'bg-red-100 text-red-700 border-red-200',
    PATCH: 'bg-purple-100 text-purple-700 border-purple-200',
  };
  return <span className={`px-2 py-1 rounded text-xs font-bold border ${colors[method]}`}>{method}</span>;
};

// 2. Dynamic URL Highlighter
const UrlDisplay = ({ path }: { path: string }) => {
  return (
    <div className="font-mono text-sm text-gray-600 flex items-center gap-1">
      {path.split('/').map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-gray-400">/</span>}
          {part.startsWith(':') ? (
            <span className="bg-yellow-100 text-yellow-800 px-1 rounded border border-yellow-300 font-semibold shadow-sm">
              {part}
            </span>
          ) : (
            <span>{part}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Main Component ---
export const EndpointsOverview = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 rounded-lg">
           <Server className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">API Reference</h1>
      </div>

      {mockApiData.map((collection) => (
        <div key={collection.slug} className="border rounded-xl shadow-sm bg-white overflow-hidden">
          {/* Collection Header */}
          <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">{collection.name}</h2>
            <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
              {collection.endpoints.length} endpoints
            </span>
          </div>

          {/* Endpoints List */}
          <div className="divide-y divide-gray-100">
            {collection.endpoints.map((ep, idx) => {
              const uniqueId = `${collection.slug}-${idx}`;
              const isExpanded = expanded === uniqueId;

              return (
                <div key={idx} className="group">
                  {/* Endpoint Row Clickable */}
                  <div 
                    onClick={() => toggleExpand(uniqueId)}
                    className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 text-center">
                         <MethodBadge method={ep.method} />
                      </div>
                      <UrlDisplay path={ep.path} />
                      <span className="text-sm text-gray-500">- {ep.summary}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400"/> : <ChevronRight className="w-4 h-4 text-gray-400"/>}
                  </div>

                  {/* Expanded Details Pane */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pl-28 bg-gray-50/50">
                      {/* Copy URL Section */}
                      <div className="flex items-center gap-2 mb-4 mt-2">
                        <code className="bg-gray-800 text-white px-3 py-2 rounded text-sm font-mono flex-1">
                          {window.location.origin}{ep.path}
                        </code>
                        <button className="p-2 hover:bg-gray-200 rounded text-gray-500" title="Copy URL">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Parameters Table */}
                      {ep.params && ep.params.length > 0 ? (
                        <div className="border rounded-lg overflow-hidden bg-white">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-600">
                              <tr>
                                <th className="px-4 py-2 font-medium">Param</th>
                                <th className="px-4 py-2 font-medium">Type</th>
                                <th className="px-4 py-2 font-medium">Required</th>
                                <th className="px-4 py-2 font-medium">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {ep.params.map((param, pIdx) => (
                                <tr key={pIdx}>
                                  <td className="px-4 py-2 font-mono text-indigo-600">{param.name}</td>
                                  <td className="px-4 py-2 text-gray-500">{param.type}</td>
                                  <td className="px-4 py-2">
                                    {param.required ? 
                                      <span className="text-red-600 font-bold text-xs">YES</span> : 
                                      <span className="text-gray-400 text-xs">NO</span>
                                    }
                                  </td>
                                  <td className="px-4 py-2 text-gray-600">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400 italic">No additional parameters required.</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

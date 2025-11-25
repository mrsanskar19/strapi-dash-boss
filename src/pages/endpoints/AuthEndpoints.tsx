import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, UploadCloud, Mail, Smartphone, 
  CreditCard, Shield, Activity 
} from 'lucide-react';

// --- Types ---
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ServiceParam {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

interface ServiceEndpoint {
  method: Method;
  path: string;
  summary: string;
  contentType?: string; // e.g., multipart/form-data
  params: ServiceParam[];
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  endpoints: ServiceEndpoint[];
}

// --- Mock Data: System Services ---
const servicesData: ServiceCategory[] = [
  {
    id: 'storage',
    title: 'Storage Service',
    icon: <UploadCloud className="w-5 h-5 text-blue-600" />,
    description: 'Handle file uploads to S3/Blob storage',
    endpoints: [
      { 
        method: 'POST', 
        path: '/services/upload', 
        summary: 'Upload Single File', 
        contentType: 'multipart/form-data',
        params: [
          { name: 'file', type: 'File', required: true, desc: 'Binary file data' },
          { name: 'folder', type: 'string', required: false, desc: 'Target folder path (e.g., /avatars)' }
        ] 
      },
      { 
        method: 'GET', 
        path: '/services/file/:fileKey', 
        summary: 'Get Signed URL', 
        params: [] 
      }
    ]
  },
  {
    id: 'email',
    title: 'Email Gateway',
    icon: <Mail className="w-5 h-5 text-purple-600" />,
    description: 'Transactional emails via SMTP/SES',
    endpoints: [
      { 
        method: 'POST', 
        path: '/services/email/send', 
        summary: 'Send Transactional Email', 
        params: [
          { name: 'to', type: 'string[]', required: true, desc: 'Recipient emails' },
          { name: 'templateId', type: 'string', required: true, desc: 'ID of the HTML template' },
          { name: 'variables', type: 'object', required: false, desc: 'JSON data for template hydration' }
        ] 
      }
    ]
  },
  {
    id: 'sms',
    title: 'SMS & OTP',
    icon: <Smartphone className="w-5 h-5 text-green-600" />,
    description: 'Integration with Twilio/Msg91',
    endpoints: [
      { 
        method: 'POST', 
        path: '/services/sms/send', 
        summary: 'Send Text Message', 
        params: [
          { name: 'phone', type: 'string', required: true, desc: 'E.164 format (e.g. +123456789)' },
          { name: 'message', type: 'string', required: true, desc: 'Text body' }
        ] 
      },
      { 
        method: 'POST', 
        path: '/services/sms/verify/:otpId', 
        summary: 'Verify OTP Code', 
        params: [
          { name: 'code', type: 'string', required: true, desc: 'User input code' }
        ] 
      }
    ]
  },
  {
    id: 'auth',
    title: 'Authentication',
    icon: <Shield className="w-5 h-5 text-red-600" />,
    description: 'OAuth and JWT management',
    endpoints: [
      { 
        method: 'POST', 
        path: '/auth/login', 
        summary: 'User Login', 
        params: [
          { name: 'email', type: 'string', required: true, desc: 'User email' },
          { name: 'password', type: 'string', required: true, desc: 'Encrypted password' }
        ] 
      },
      { 
        method: 'POST', 
        path: '/auth/refresh', 
        summary: 'Refresh Access Token', 
        params: [
          { name: 'refreshToken', type: 'string', required: true, desc: 'HttpOnly cookie or body' }
        ] 
      }
    ]
  }
];

// --- Components ---

const MethodBadge = ({ method }: { method: Method }) => {
  const colors = {
    GET: 'bg-green-100 text-green-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-orange-100 text-orange-700',
    DELETE: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${colors[method]}`}>{method}</span>;
};

export const AuthEnpoints = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-6 h-6 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">System Services API</h1>
      </div>

      <div className="grid gap-6">
        {servicesData.map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
            {/* Service Header */}
            <div className="bg-gray-50/80 px-6 py-4 border-b flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                {service.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{service.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{service.description}</p>
              </div>
            </div>

            {/* Endpoints */}
            <div className="divide-y divide-gray-100">
              {service.endpoints.map((ep, idx) => {
                const uniqueId = `${service.id}-${idx}`;
                const isOpen = openSection === uniqueId;

                return (
                  <div key={uniqueId} className="group">
                    <div 
                      onClick={() => setOpenSection(isOpen ? null : uniqueId)}
                      className="px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <MethodBadge method={ep.method} />
                        <span className="font-mono text-sm text-gray-700">
                          {ep.path.split(/(:[^/]+)/g).map((part, i) => 
                            part.startsWith(':') 
                            ? <span key={i} className="text-orange-600 font-bold bg-orange-50 px-1 rounded">{part}</span> 
                            : part
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{ep.summary}</span>
                        {isOpen ? <ChevronDown className="w-4 h-4 text-gray-400"/> : <ChevronRight className="w-4 h-4 text-gray-300"/>}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isOpen && (
                      <div className="bg-gray-50/50 border-t border-gray-100 px-6 py-4">
                        {ep.contentType && (
                          <div className="mb-3 inline-block bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded border border-indigo-100 font-mono">
                            Header: Content-Type: {ep.contentType}
                          </div>
                        )}
                        
                        <div className="rounded-lg border bg-white overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                              <tr>
                                <th className="px-4 py-2 w-1/4">Parameter</th>
                                <th className="px-4 py-2 w-1/6">Type</th>
                                <th className="px-4 py-2 w-1/6">Required</th>
                                <th className="px-4 py-2">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {ep.params.map((p, k) => (
                                <tr key={k}>
                                  <td className="px-4 py-2 font-mono text-gray-700">{p.name}</td>
                                  <td className="px-4 py-2 text-blue-600 font-mono">{p.type}</td>
                                  <td className="px-4 py-2">
                                    {p.required && <span className="text-red-500 font-bold">•</span>}
                                  </td>
                                  <td className="px-4 py-2 text-gray-500">{p.desc}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
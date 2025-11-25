import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Database, Code, Server, Play, Info } from "lucide-react";

const StepPill = ({ idx, title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all ${
      active ? "bg-foreground text-white shadow" : "bg-muted/10 text-muted-foreground"
    }`}
    aria-current={active}
  >
    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${active ? "bg-white text-foreground" : "bg-white/10"}`}>
      {idx}
    </span>
    <span className="font-medium text-sm">{title}</span>
  </button>
);

const Feature = ({ title, desc, icon: Icon, badge }) => (
  <div className="flex items-start gap-3 p-3 rounded border border-muted/10 bg-muted/5">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/20 text-foreground">
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        {badge && <div className="text-xs px-2 py-0.5 rounded bg-foreground/10 text-foreground">{badge}</div>}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{desc}</div>
    </div>
  </div>
);

export default function StartHere() {
  const steps = [
    { id: 1, title: "Overview", icon: Server },
    { id: 2, title: "Tutorial", icon: Database },
    { id: 3, title: "Features", icon: Code },
  ];
  const [activeStep, setActiveStep] = useState(1);

  // Tutorial content (static, concise)
  const tutorial = {
    1: {
      title: "Overview",
      paragraphs: [
        "Backend Hub is your central console for building, managing, and testing backend resources — applications, databases, and APIs — without friction.",
        "Use the left navigation to jump to Applications, Database, API Docs and Playground. This tutorial shows the recommended flow and best practices.",
      ],
      tips: [
        "Start by creating a clear application name and short description — these appear in endpoints and UI.",
        "Use the Playground to test endpoints before wiring clients."
      ]
    },
    2: {
      title: "Quick Tutorial",
      paragraphs: [
        "1) Create an Application: give it a name and short description. This acts as a namespace for your endpoints.",
        "2) Set up your Database: pick a DB type, create collections/tables and seed a few records to test queries.",
        "3) Explore the API: open the API docs, test GET/POST for your collections, enable auth when ready."
      ],
      tips: [
        "Enable Auth early if you plan to expose endpoints publicly.",
        "Keep collection names plural and consistent (users, orders, products)."
      ]
    },
    3: {
      title: "Best Practices & Next Steps",
      paragraphs: [
        "Protect production data: use staging environments and backups before major migrations.",
        "Use rate limits and auth to avoid abuse. Monitor logs for suspicious patterns.",
      ],
      tips: [
        "Use the Playground for quick smoke tests.",
        "Automate backups and export schedules for critical datasets."
      ]
    }
  };

  const features = [
    {
      title: "Auto-generated REST API",
      desc: "Instant REST endpoints for every collection. Ready to call from frontend or Postman.",
      icon: Code,
      badge: "Instant"
    },
    {
      title: "Database Management",
      desc: "Create, edit, and seed collections with a friendly UI. Import/export supported.",
      icon: Database,
      badge: "UI"
    },
    {
      title: "Playground",
      desc: "Interactively test endpoints, tweak payloads and see responses in real time.",
      icon: Play,
      badge: "Test"
    },
    {
      title: "Monitoring & Logs",
      desc: "View request logs, error traces, and basic analytics to help debug quickly.",
      icon: Info,
      badge: "Observability"
    }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome to Backend Hub</h1>
        <p className="text-lg text-muted-foreground mt-2">Short guide to help you get the most out of the platform.</p>
      </div> */}

      {/* Stepper & progress */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          {steps.map((s) => (
            <StepPill key={s.id} idx={s.id} title={s.title} active={activeStep === s.id} onClick={() => setActiveStep(s.id)} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">Quick links:</div>
          <Link to="/playground"><Button variant="ghost" className="px-3">Playground</Button></Link>
          <Link to="/applications"><Button className="px-3">Applications</Button></Link>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{tutorial[activeStep].title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: tutorial text */}
            <div className="md:col-span-2 space-y-4">
              {tutorial[activeStep].paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground">{p}</p>
              ))}

              <div className="mt-3">
                <div className="text-sm font-semibold">Tips</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {tutorial[activeStep].tips.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </div>

              <div className="mt-4 flex gap-3">
                <Button onClick={() => setActiveStep((s) => Math.max(1, s - 1))} variant="outline">Previous</Button>
                <Button onClick={() => setActiveStep((s) => Math.min(3, s + 1))}>Next</Button>
                <Link to="/playground"><Button variant="link" className="ml-auto">Open Playground <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
            </div>

            {/* Right: features */}
            <aside className="md:col-span-1 space-y-3">
              <div className="font-semibold">Key Features</div>
              <div className="space-y-2">
                {features.map((f) => <Feature key={f.title} title={f.title} desc={f.desc} icon={f.icon} badge={f.badge} />)}
              </div>

              <div className="mt-4">
                <div className="text-xs text-muted-foreground">Need help?</div>
                <div className="mt-2 flex flex-col gap-2">
                  <Link to="/docs"><Button variant="ghost" className="w-full">Documentation</Button></Link>
                  <Link to="/support"><Button variant="outline" className="w-full">Contact Support</Button></Link>
                </div>
              </div>
            </aside>
          </div>
        </CardContent>
      </Card>

      {/* Footer badges */}
      <div className="flex gap-3">
        <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm inline-flex items-center gap-2"><Check className="w-4 h-4" /> Easy to use</span>
        <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm inline-flex items-center gap-2"><Database className="w-4 h-4" /> Powerful DB</span>
        <span className="px-3 py-1 rounded bg-purple-100 text-purple-700 text-sm inline-flex items-center gap-2"><Code className="w-4 h-4" /> REST APIs</span>
      </div>
    </div>
  );
}

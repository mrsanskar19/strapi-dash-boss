import { useState } from 'react';
import GeneralSettings from './settings/General';
import SecuritySettings from './settings/Security';
import PreferencesSettings from './settings/Preferences';
import NotificationsSettings from './settings/Notifications';
import PasswordSettings from './settings/Password';
import ApplicationAccess from './settings/ApplicationAccess';
import { cn } from "@/lib/utils";

const settingsNav = [
  { title: "General", component: <GeneralSettings /> },
  { title: "Security", component: <SecuritySettings /> },
  { title: "Password", component: <PasswordSettings /> },
  { title: "Preferences", component: <PreferencesSettings /> },
  { title: "Notifications", component: <NotificationsSettings /> },
  { title: "Application Access", component: <ApplicationAccess /> },
];

export default function Settings() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(settingsNav[0].component);
  const [activeTitle, setActiveTitle] = useState(settingsNav[0].title);

  const handleNavClick = (component: React.ReactNode, title: string) => {
    setActiveComponent(component);
    setActiveTitle(title);
  };

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your account settings and set e-mail preferences.</p>
        </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="">
        <GeneralSettings />
        <SecuritySettings />
        <PasswordSettings />
        <PreferencesSettings />
        <NotificationsSettings /> 
        <ApplicationAccess />
        </main>
      </div>
    </div>
  );
}

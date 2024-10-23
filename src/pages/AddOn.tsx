import React, { useMemo } from "react";
import { CardWithForm } from "@/components/add-on";
import {
  Calendar,
  FileText,
  MessageSquare,
  Clipboard,
  Folder,
  PenTool,
} from "lucide-react";

const addOns = [
  {
    title: "Project Management",
    description:
      "Efficiently manage your projects with advanced tools and features",
    icon: Clipboard,
  },
  {
    title: "Task Organizer",
    description: "Organize and prioritize your tasks for maximum productivity",
    icon: PenTool,
  },
  {
    title: "Event Calendar",
    description:
      "Schedule and manage your events with an intuitive calendar interface",
    icon: Calendar,
  },
  {
    title: "Note Taking",
    description:
      "Capture and organize your ideas with a powerful note-taking system",
    icon: FileText,
  },
  {
    title: "File Storage",
    description: "Securely store and manage your documents in the cloud",
    icon: Folder,
  },
  {
    title: "Team Chat",
    description:
      "Collaborate with your team in real-time with integrated messaging",
    icon: MessageSquare,
  },
];

const AddOn: React.FC = () => {
  const memoizedAddOns = useMemo(() => addOns, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Add-Ons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memoizedAddOns.map((addon) => (
          <CardWithForm
            key={addon.title}
            title={addon.title}
            description={addon.description}
            icon={addon.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default AddOn;

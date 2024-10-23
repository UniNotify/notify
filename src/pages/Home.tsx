import React, { useState, useCallback, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";

const searchResults = [
  {
    id: 1,
    title: "Dashboard Overview",
    description: "Main dashboard with key metrics and visualizations",
  },
  {
    id: 2,
    title: "User Settings",
    description: "Configure user preferences and account details",
  },
  {
    id: 3,
    title: "Project Management",
    description: "Tools for managing projects, tasks, and deadlines",
  },
  {
    id: 4,
    title: "Calendar Events",
    description: "View and manage scheduled events and appointments",
  },
  {
    id: 5,
    title: "Task List",
    description: "Comprehensive list of tasks with priority and status",
  },
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<
    (typeof searchResults)[0] | null
  >(null);

  const [installedAddOns, setInstalledAddOns] = useState<string[]>([]);

  useEffect(() => {
    const cookies = Cookies.get();
    const installed = Object.keys(cookies)
      .filter((key) => key.startsWith("addon_") && cookies[key] === "true")
      .map((key) => key.replace("addon_", ""));
    setInstalledAddOns(installed);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchTerm) return [];
    return searchResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const highlightText = useCallback((text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>

      <Card className="border">
        <CardHeader>
          <CardTitle>Quick Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              ) : (
                <SearchIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
          {filteredResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Search Results:</h3>
              <ul className="space-y-2">
                {filteredResults.map((result) => (
                  <li
                    key={result.id}
                    className="text-sm cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors duration-200"
                    onClick={() => setSelectedResult(result)}
                    dangerouslySetInnerHTML={{
                      __html: `<strong>${highlightText(
                        result.title,
                        searchTerm
                      )}</strong>: ${highlightText(
                        result.description,
                        searchTerm
                      )}`,
                    }}
                  />
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to your dashboard. Here you can manage all your
              notifications and settings.
            </p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardHeader>
            <CardTitle>Installed Add-Ons</CardTitle>
          </CardHeader>
          <CardContent>
            {installedAddOns.length > 0 ? (
              <ul className="list-disc pl-5">
                {installedAddOns.map((addon) => (
                  <li key={addon}>{addon}</li>
                ))}
              </ul>
            ) : (
              <p>No add-ons installed yet.</p>
            )}
          </CardContent>
        </Card>
        <Card className="border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Last login: 2 hours ago</p>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        title={selectedResult?.title || ""}
        content={selectedResult?.description || ""}
      />
    </div>
  );
};

export default Home;

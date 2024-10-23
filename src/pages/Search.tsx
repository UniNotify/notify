import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Search as SearchIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
  {
    id: 6,
    title: "Analytics Report",
    description: "Detailed analytics and performance reports",
  },
  {
    id: 7,
    title: "Team Collaboration",
    description: "Tools for team communication and file sharing",
  },
  {
    id: 8,
    title: "Resource Allocation",
    description: "Manage and allocate resources across projects",
  },
];

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<typeof searchResults>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const filteredResults = searchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch]);

  return (
    <div className="flex flex-col items-center justify-center max-h-screen max-w-full p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Start typing to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base sm:text-lg py-3 sm:py-4 pl-4 pr-12 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            ) : (
              <SearchIcon className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        {results.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Search Results
            </h2>
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="transition-shadow">
                  <CardHeader>
                    <CardTitle>{result.title}</CardTitle>
                    <CardDescription>{result.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </>
        )}
        {searchTerm && results.length === 0 && !isLoading && (
          <p className="text-lg text-center text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

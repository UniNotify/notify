import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWithFormProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function CardWithForm({
  title,
  description,
  icon: Icon,
}: CardWithFormProps) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const savedState = Cookies.get(`addon_${title}`);
    if (savedState) {
      setIsAdded(savedState === "true");
    }
  }, [title]);

  const handleButtonClick = () => {
    const newState = !isAdded;
    setIsAdded(newState);
    Cookies.set(`addon_${title}`, newState.toString(), { expires: 365 });
  };

  return (
    <Card className="border flex flex-col h-full">
      <CardHeader className="flex-grow">
        <div className="flex items-center space-x-4 mb-2">
          <div className="bg-primary/10 p-2 rounded-full" aria-hidden="true">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
        </div>
        <CardDescription className="text-sm line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-4">
        <Button
          className="w-full"
          variant={isAdded ? "outline" : "default"}
          onClick={handleButtonClick}
          aria-pressed={isAdded}
        >
          {isAdded ? "Remove" : "Install"}
        </Button>
      </CardFooter>
    </Card>
  );
}

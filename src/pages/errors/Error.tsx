import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-muted-foreground mb-4 text-6xl font-bold">
            404
          </CardTitle>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            {token ? (
              <Link to="/chat">Go Back Home</Link>
            ) : (
              <Link to="/">Go Back Home</Link>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

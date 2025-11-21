import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Adding a fun twist with a console message
    console.log("Hey there, explorer! Looks like you've ventured off the beaten path.");
    console.error(`404 Error: User attempted to access non-existent route: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <div className="text-center max-w-md">
        {/* SVG Illustration */}
        <svg
          className="w-64 h-64 mx-auto mb-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.343a4 4 0 100-8.686 4 4 0 000 8.686zM14.828 7.657a4 4 0 100 8.686 4 4 0 000-8.686z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 9l-6 6m0-6l6 6"
          />
        </svg>

        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-foreground mb-4">Oops! Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          It seems you've stumbled upon a page that doesn't exist. Don't worry, it happens to the best of us.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button size="lg">Return to Home</Button>
          </Link>
          <Link to="/start-here">
            <Button size="lg" variant="outline">
              Get Help
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

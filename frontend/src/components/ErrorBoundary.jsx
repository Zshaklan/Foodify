import { Link, useRouteError } from "react-router-dom";
import Button from "./UI/Button";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Something went wrong!</h1>
      <p>{error?.message || "Unknown error occurred."}</p>
      <Link to={"/login"}>
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}

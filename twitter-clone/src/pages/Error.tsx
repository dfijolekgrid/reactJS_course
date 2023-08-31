import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const HomeLink = () => (
    <Link className="text-xl text-blue-400" to={``}>
      Home
    </Link>
  );

  if (isRouteErrorResponse(error)) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
        <HomeLink />
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
        <HomeLink />
      </div>
    );
  } else {
    return <></>;
  }
}

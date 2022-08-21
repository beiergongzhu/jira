import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallBack } from "components/lib";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* 错误边界 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {/* 有 user 就说明已经登陆 */}
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
};

export default App;

import React from "react";
import { useNavigate, useLocation } from "react-router";

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    // 🔑 Reset error if route changes
    if (prevProps.location !== this.props.location && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <this.props.fallback />;
    }
    return this.props.children;
  }
}

export function ErrorBoundary({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const FallbackPage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-bg-1)] text-center p-6">
      <h1 className="text-3xl font-bold text-[var(--color-text-3)] mb-4">
        Something went wrong!
      </h1>
      <p className="mb-6 text-[var(--color-text-1)]">
        If this issue persists, please report it to the support team or your
        system administrator so we can resolve it quickly.{" "}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="button-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );

  return (
    <ErrorBoundaryInner fallback={FallbackPage} location={location}>
      {children}
    </ErrorBoundaryInner>
  );
}

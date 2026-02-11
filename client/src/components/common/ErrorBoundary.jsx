import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-charcoal">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-md font-body text-sm text-warm-gray">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="mt-6 rounded-full bg-sage px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-sage-dark"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

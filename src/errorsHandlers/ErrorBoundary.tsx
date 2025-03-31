'use client';
import Button from '@/UI/buttons/Button';
import { ApplicationError } from '@/types/errors';
import React from 'react';
import './errorBoundary.scss';

interface ErrorBoundaryState {
  error: ApplicationError | null;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ children: React.ReactNode }>,
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: ApplicationError) {
    return { error };
  }
  componentDidCatch() {}

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="error-boundary">
          {error.type === 'network' ? (
            <>
              <h2>Network Error</h2>
              <p>{error.message}</p>
            </>
          ) : (
            <>
              <h2>HTTP Error {error.status}</h2>
              <p>{error.statusText}</p>
            </>
          )}
          <Button text="Try Again" onClick={this.handleReset} />
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

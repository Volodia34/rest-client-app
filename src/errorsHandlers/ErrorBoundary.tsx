'use client';
import Button from '@/UI/buttons/Button';
import { ApplicationError } from '@/types/errors';
import React from 'react';
import Image from 'next/image';
import errorImage from '@/assets/img/not-found.png';
import styles from './errorBoundary.module.scss';

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
  static getDerivedStateFromError(error: unknown) {
    const applicationError: ApplicationError = error as ApplicationError;

    if (error instanceof Error) {
      applicationError.message = error.message;
    }

    if (!applicationError.type) {
      applicationError.type = 'network';
    }

    return { error: applicationError };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error);
    console.error('Error info:', errorInfo);
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className={styles.errorBoundary}>
          <Image
            priority={true}
            className={styles.image}
            src={errorImage}
            alt="Error image"
          />
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
          <Button
            className="error-button"
            text="Try Again"
            onClick={this.handleReset}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

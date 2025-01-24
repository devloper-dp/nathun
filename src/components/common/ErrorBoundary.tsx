import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ThreeDErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('3D Component Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900 rounded-xl p-8">
          <Loader2 className="h-12 w-12 text-yellow-500 animate-spin mb-4" />
          <p className="text-white text-center">
            Loading 3D components...
            <br />
            <span className="text-sm text-gray-400">Please wait or refresh the page.</span>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
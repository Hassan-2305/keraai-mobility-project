import React from 'react';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center gap-3 mb-4 text-red-500">
                            <AlertCircle className="h-8 w-8" />
                            <h1 className="text-xl font-bold">Application Crashed</h1>
                        </div>
                        <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-red-400 overflow-auto max-h-64 mb-4 border border-slate-800">
                            {this.state.error?.toString()}
                            <br />
                            {this.state.errorInfo?.componentStack}
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
          <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-red-500/20 p-4 rounded-full">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Bir şeyler ters gitti</h1>
            <p className="text-slate-400 mb-6">
              Uygulama beklenmeyen bir hata ile karşılaştı. Lütfen sayfayı yenileyin veya geliştirici ile iletişime geçin.
            </p>
            <div className="bg-slate-950 p-4 rounded-lg text-left mb-6 overflow-auto max-h-40 border border-slate-800">
              <code className="text-xs text-red-400 font-mono">
                {this.state.error?.message || "Bilinmeyen Hata"}
              </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
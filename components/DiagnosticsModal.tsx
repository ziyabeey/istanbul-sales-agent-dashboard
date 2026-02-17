import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle, Loader2, Play } from 'lucide-react';
import { api } from '../services/api';

const DiagnosticsModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [checks, setChecks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = () => setIsOpen(true);
        window.addEventListener('open-diagnostics', handler);
        return () => window.removeEventListener('open-diagnostics', handler);
    }, []);

    const runDiagnostics = async () => {
        setLoading(true);
        const results = [];

        // 1. Environment Check
        results.push({
            name: "Uygulama Ortamı",
            status: window.location.href.includes('localhost') ? 'success' : 'warning',
            detail: `URL: ${window.location.href}`
        });

        // 2. Google Scripts
        const gapiLoaded = !!window.gapi;
        const gisLoaded = !!window.google;
        results.push({
            name: "Google Scriptleri",
            status: gapiLoaded && gisLoaded ? 'success' : 'error',
            detail: `GAPI: ${gapiLoaded ? 'OK' : 'Yok'}, GIS: ${gisLoaded ? 'OK' : 'Yok'}`
        });

        // 3. API Keys
        const apiKey = localStorage.getItem('googleApiKey');
        const clientId = localStorage.getItem('clientId');
        const geminiKey = localStorage.getItem('geminiApiKey');

        results.push({
            name: "API Anahtarları",
            status: apiKey && clientId && geminiKey ? 'success' : 'error',
            detail: `Google Key: ${apiKey ? 'Var' : 'Yok'}, Client ID: ${clientId ? 'Var' : 'Yok'}, Gemini: ${geminiKey ? 'Var' : 'Yok'}`
        });

        // 4. Auth Status
        let authStatus = 'unknown';
        if (window.gapi?.client?.getToken()) {
            authStatus = 'success';
        } else {
            authStatus = 'warning';
        }
        results.push({
            name: "Oturum Durumu (Token)",
            status: authStatus,
            detail: authStatus === 'success' ? 'Google Token Aktif' : 'Giriş Yapılmamış'
        });

        // 5. Test Gmail API (if auth exists)
        if (authStatus === 'success') {
            try {
                // Try to list labels as a lightweight test
                await window.gapi.client.gmail.users.labels.list({ userId: 'me' });
                results.push({
                    name: "Gmail API Erişimi",
                    status: 'success',
                    detail: "Erişim başarılı"
                });
            } catch (e: any) {
                results.push({
                    name: "Gmail API Erişimi",
                    status: 'error',
                    detail: `Hata: ${e.result?.error?.message || e.message}`
                });
            }
        }

        setChecks(results);
        setLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            runDiagnostics();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                        <ShieldCheck className="text-indigo-600" /> Sistem Tanılayıcı
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <XCircle size={24} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <Loader2 size={40} className="animate-spin text-indigo-600 mb-4" />
                            <p>Sistem kontrol ediliyor...</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {checks.map((check, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <div className="mt-1">
                                        {check.status === 'success' && <CheckCircle className="text-green-500" size={20} />}
                                        {check.status === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
                                        {check.status === 'error' && <XCircle className="text-red-500" size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{check.name}</h4>
                                        <p className="text-xs text-slate-500 mt-1 font-mono break-all">{check.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                    <button
                        onClick={runDiagnostics}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Play size={16} /> Yeniden Test Et
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticsModal;

import React, { useState } from 'react';
/* global MoudarEngine */

export default function APIDocumentationView({ lang, onClose }) {
  const docs = MoudarEngine.getAPIDocumentation(lang);
  const sdk = MoudarEngine.getSDK();
  const curl = MoudarEngine.getCurlExamples();
  const [tab, setTab] = useState('endpoints');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {"\uD83D\uDD0C"} API Moudar v{docs.version}
            </h2>
            <p className="text-sm text-slate-300">{docs.baseUrl}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            {['endpoints', 'sdk', 'curl'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={"px-4 py-2 font-medium " + (tab === t ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500')}
              >
                {t === 'endpoints' ? '\uD83D\uDCDA Endpoints' : t === 'sdk' ? '\uD83D\uDCBB SDK' : '\uD83D\uDDA5\uFE0F cURL'}
              </button>
            ))}
          </div>

          {/* Endpoints Tab */}
          {tab === 'endpoints' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">{"\uD83D\uDD10"} Authentication</h3>
                <code className="text-sm bg-white p-2 rounded block">{docs.authentication.header}</code>
              </div>
              {docs.categories.map((cat) => (
                <div key={cat.name} className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-100 p-3 font-bold capitalize">{cat.name}</div>
                  <div className="divide-y">
                    {cat.endpoints.map((ep) => {
                      const methodColor = ep.method === 'GET' ? 'bg-green-100 text-green-700' : ep.method === 'POST' ? 'bg-blue-100 text-blue-700' : ep.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
                      return (
                        <div key={ep.name} className="p-3 flex items-center gap-3">
                          <span className={"px-2 py-1 rounded text-xs font-bold " + methodColor}>{ep.method}</span>
                          <code className="text-sm flex-1">{ep.path}</code>
                          <span className="text-gray-500 text-sm">{ep.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SDK Tab */}
          {tab === 'sdk' && (
            <div className="p-4 bg-slate-900 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-green-400 font-bold">JavaScript SDK</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">{"\uD83D\uDCCB"} Copy</button>
              </div>
              <pre className="text-green-300 text-sm overflow-x-auto whitespace-pre-wrap">{sdk}</pre>
            </div>
          )}

          {/* cURL Tab */}
          {tab === 'curl' && (
            <div className="space-y-4">
              {Object.keys(curl).map((key) => (
                <div key={key} className="p-4 bg-slate-900 rounded-xl">
                  <div className="text-gray-400 text-sm mb-2 capitalize">{key}</div>
                  <pre className="text-green-300 text-sm overflow-x-auto">{curl[key]}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
/* global MoudarEngine */

export default function DataIntegrationsView({ project, protocol, lang, onClose }) {
  const integrations = MoudarEngine.getIntegrations();
  const [selected, setSelected] = useState(null);
  const [config, setConfig] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [generatedForm, setGeneratedForm] = useState(null);

  const handleTest = () => {
    const result = MoudarEngine.testIntegration(selected, config, lang);
    setTestResult(result);
  };

  const handleGenerateForm = (type) => {
    const form = type === 'redcap'
      ? MoudarEngine.generateRedcapForm(project, protocol, lang)
      : MoudarEngine.generateOdkForm(project, protocol, lang);
    setGeneratedForm({ type, data: form });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {"\uD83D\uDD17 "}{lang === "fr" ? "Int\u00E9grations Donn\u00E9es" : "Data Integrations"}
            </h2>
            <p className="text-sm text-teal-200">REDCap {"\u2022"} ODK {"\u2022"} DHIS2 {"\u2022"} KoboToolbox</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-teal-500 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="p-6">
          {/* Integration Cards */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {Object.values(integrations).map((i) => {
              const isSelected = selected === i.id;
              const isAvailable = i.status === 'available';
              return (
                <button
                  key={i.id}
                  onClick={() => {
                    if (isAvailable) {
                      setSelected(i.id);
                      setTestResult(null);
                      setGeneratedForm(null);
                    }
                  }}
                  disabled={!isAvailable}
                  className={"p-4 rounded-xl border-2 transition text-center " + (isSelected ? 'border-teal-500 bg-teal-50' : isAvailable ? 'border-gray-200 hover:border-gray-400' : 'border-gray-100 opacity-50')}
                >
                  <div className="text-3xl mb-2">{i.logo}</div>
                  <div className="font-bold text-sm">{i.name}</div>
                  {!isAvailable && <span className="text-xs text-gray-400">{lang === 'fr' ? 'Bient\u00F4t' : 'Coming'}</span>}
                </button>
              );
            })}
          </div>

          {/* Configuration */}
          {selected && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-bold mb-3">
                  {lang === "fr" ? "Configuration" : "Configuration"} {integrations[selected].name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{integrations[selected].desc[lang]}</p>
                {MoudarEngine.getIntegrationConfig(selected, lang).fields.map((field) => (
                  <div key={field.id} className="mb-3">
                    <label className="block text-sm font-medium mb-1">{field.label[lang] || field.label}</label>
                    <input
                      type={field.type}
                      className="w-full p-2 border rounded-lg"
                      value={config[field.id] || ''}
                      onChange={(e) => {
                        const newConfig = { ...config };
                        newConfig[field.id] = e.target.value;
                        setConfig(newConfig);
                      }}
                    />
                  </div>
                ))}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleTest}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    {"\uD83D\uDD0D "}{lang === "fr" ? "Tester connexion" : "Test connection"}
                  </button>
                  {(selected === 'redcap' || selected === 'odk') && (
                    <button
                      onClick={() => handleGenerateForm(selected)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {"\uD83D\uDCDD "}{lang === "fr" ? "G\u00E9n\u00E9rer formulaire" : "Generate form"}
                    </button>
                  )}
                </div>
              </div>

              {/* Test Result */}
              {testResult && (
                <div className={"p-4 rounded-xl " + (testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200')}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{testResult.success ? '\u2705' : '\u274C'}</span>
                    <span className="font-medium">{testResult.message}</span>
                  </div>
                  {testResult.details && (
                    <div className="mt-2 text-sm text-gray-600">
                      Version: {testResult.details.version} {"\u2022"} {testResult.details.projects} {lang === 'fr' ? 'projets trouv\u00E9s' : 'projects found'}
                    </div>
                  )}
                </div>
              )}

              {/* Generated Form */}
              {generatedForm && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">
                    {"\uD83D\uDCCB "}{generatedForm.type === 'redcap' ? 'REDCap Data Dictionary' : 'ODK XLSForm'} {lang === 'fr' ? 'g\u00E9n\u00E9r\u00E9' : 'generated'}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    {generatedForm.data.instruments ? generatedForm.data.instruments.length + ' instruments' : ''}
                    {generatedForm.data.events ? ' \u2022 ' + generatedForm.data.events.length + ' events' : ''}
                    {generatedForm.data.form && generatedForm.data.form.survey ? ' \u2022 ' + generatedForm.data.form.survey.length + ' questions' : ''}
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    {"\uD83D\uDCE5 "}{lang === "fr" ? "T\u00E9l\u00E9charger" : "Download"} {generatedForm.type === 'redcap' ? 'XML' : 'XLSForm'}
                  </button>
                </div>
              )}
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

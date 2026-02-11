import React, { useState } from 'react';
/* global MoudarEngine */

export default function PowerPointGeneratorView({ project, protocol, lang, onClose }) {
  const pptData = MoudarEngine.generatePowerPointData(project, protocol, lang);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const currentSlide = pptData.slides[selectedSlide];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              {"\uD83D\uDCCA "}{lang === "fr" ? "G\u00E9n\u00E9rateur PowerPoint" : "PowerPoint Generator"}
            </h2>
            <p className="text-sm text-orange-100">{pptData.slideCount} slides</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-400 rounded-lg">{"\u2715"}</button>
        </div>

        <div className="flex">
          {/* Slide List */}
          <div className="w-48 bg-gray-100 p-3 border-r overflow-y-auto max-h-[70vh]">
            {pptData.slides.map((slide, i) => (
              <div
                key={i}
                onClick={() => setSelectedSlide(i)}
                className={"p-2 mb-2 rounded cursor-pointer text-xs " + (selectedSlide === i ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-200')}
              >
                <div className="font-bold">{i + 1}. {slide.type}</div>
                <div className="truncate">{slide.title}</div>
              </div>
            ))}
          </div>

          {/* Slide Preview */}
          <div className="flex-1 p-6">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 text-white shadow-xl">
              {currentSlide.type === 'title' && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <h1 className="text-3xl font-bold mb-4">{currentSlide.title}</h1>
                  <p className="text-xl text-slate-300">{currentSlide.subtitle}</p>
                  <p className="absolute bottom-4 text-xs text-slate-600">{currentSlide.footer}</p>
                </div>
              )}
              {currentSlide.type === 'agenda' && (
                <div className="h-full">
                  <h2 className="text-2xl font-bold mb-6">{currentSlide.title}</h2>
                  <ol className="space-y-3">
                    {currentSlide.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {currentSlide.type === 'content' && (
                <div className="h-full">
                  <h2 className="text-2xl font-bold mb-4">{currentSlide.title}</h2>
                  <p className="text-slate-300 mb-4">{currentSlide.content}</p>
                  <div className="space-y-2">
                    {currentSlide.keyPoints && currentSlide.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span>{kp.icon}</span>
                        <span>{kp.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentSlide.type === 'strategies' && (
                <div className="h-full">
                  <h2 className="text-2xl font-bold mb-2">{currentSlide.title}</h2>
                  <p className="text-sm text-slate-400 mb-4">{currentSlide.subtitle}</p>
                  <div className="space-y-3">
                    {currentSlide.strategies && currentSlide.strategies.map((s) => (
                      <div key={s.number} className="flex items-center gap-3 p-2 bg-white/10 rounded">
                        <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">{s.number}</span>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentSlide.type === 'prediction' && (
                <div className="h-full text-center">
                  <h2 className="text-2xl font-bold mb-4">{currentSlide.title}</h2>
                  <div className="text-6xl font-bold text-green-400 mb-4">{currentSlide.probability}%</div>
                  <div className="grid grid-cols-3 gap-2">
                    {currentSlide.factors && currentSlide.factors.map((f, i) => (
                      <div key={i} className={"p-2 rounded " + (f.type === 'positive' ? 'bg-green-500/20' : 'bg-red-500/20')}>
                        <div className={f.type === 'positive' ? 'text-green-400' : 'text-red-400'}>{f.impact}</div>
                        <div className="text-xs">{f.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentSlide.type === 'budget' && (
                <div className="h-full">
                  <h2 className="text-2xl font-bold mb-4">{currentSlide.title}</h2>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-white/10 rounded">
                      <div className="text-2xl font-bold text-green-400">{currentSlide.totalBudget}</div>
                      <div className="text-xs">Total</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded">
                      <div className="text-2xl font-bold text-blue-400">{currentSlide.roi}</div>
                      <div className="text-xs">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded">
                      <div className="text-2xl font-bold text-purple-400">{currentSlide.payback}</div>
                      <div className="text-xs">Payback</div>
                    </div>
                  </div>
                </div>
              )}
              {currentSlide.type === 'closing' && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <h1 className="text-4xl font-bold mb-4">{currentSlide.title}</h1>
                  <p className="text-xl text-slate-300 mb-6">{currentSlide.contact}</p>
                  <p className="text-sm text-slate-600">{currentSlide.tagline}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setSelectedSlide(Math.max(0, selectedSlide - 1))}
                disabled={selectedSlide === 0}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                {"\u2190 "}{lang === "fr" ? "Pr\u00E9c\u00E9dent" : "Previous"}
              </button>
              <span className="text-gray-500">{selectedSlide + 1} / {pptData.slideCount}</span>
              <button
                onClick={() => setSelectedSlide(Math.min(pptData.slideCount - 1, selectedSlide + 1))}
                disabled={selectedSlide === pptData.slideCount - 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                {lang === "fr" ? "Suivant" : "Next"}{" \u2192"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            {"\uD83D\uDCE5 "}{lang === "fr" ? "T\u00E9l\u00E9charger PPTX" : "Download PPTX"}
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            {lang === "fr" ? "Fermer" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

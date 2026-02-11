import React from 'react';

const Tooltip = (props) => {
  const term = props.term;
  const lang = props.lang || "fr";
  const children = props.children;
  const [show, setShow] = React.useState(false);
  const definition = TECHNICAL_TERMS[term] ? TECHNICAL_TERMS[term][lang] : null;
  if (!definition) return children;
  return (
    <span
      className="relative cursor-help border-b border-dotted border-gray-400"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <span className="text-xs text-blue-500 ml-0.5">{"\u24D8"}</span>
      {show && (
        <span className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl">
          <strong className="text-blue-300">{term}</strong>
          <br />
          <span className="text-slate-300">{definition}</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800" />
        </span>
      )}
    </span>
  );
};

export default Tooltip;

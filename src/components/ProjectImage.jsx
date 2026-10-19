import { useState } from "react";
import Icon from "./Icon.jsx";

/**
 * Shows the project screenshot when available; falls back to a styled
 * gradient placeholder so the UI never looks broken before images exist.
 */
function ProjectImage({ src, alt, className = "" }) {
  const [ok, setOk] = useState(Boolean(src));

  if (!ok) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-indigo-600/40 via-slate-800 to-cyan-600/30 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Icon name="code" className="h-12 w-12 text-slate-500" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={className}
    />
  );
}

export default ProjectImage;

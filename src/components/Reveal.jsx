import useInView from "../hooks/useInView.js";

/** Fades + slides its children up into view the first time they scroll in. */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Reveal;

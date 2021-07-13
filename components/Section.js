import classnames from "classnames";

// Provides a flexible layout building block
export default function Section({
  children,
  className = "",
  short = false,
  narrow = false,
}) {
  const spacing = classnames({
    "py-6 md:py-8 lg:py-10": short,
    "py-10 md:py-12 lg:py-24": !short,
    "md:w-8/12": narrow,
    "md:w-10/12": !narrow,
  });
  return (
    <section className={`w-full px-4 md:px-8 ${spacing} ${className}`}>
      {children}
    </section>
  );
}

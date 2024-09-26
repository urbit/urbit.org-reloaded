"use client";

const OverviewSection = ({ title, children }) => {
  return (
    <section className="overview-section">
      <div className="overview-section-title">{title}</div>
      <div className="overview-section-body">{children}</div>
    </section>
  );
};

export { OverviewSection };

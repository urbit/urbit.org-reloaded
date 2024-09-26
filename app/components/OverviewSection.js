"use client";
import SVG from "react-inlinesvg";

const OverviewSection = ({ title, children }) => {
  return (
    <section className="overview-section">
      <div className="overview-section-title">{title}</div>
      <div className="overview-section-body">{children}</div>
    </section>
  );
};

const OverviewSVG = ({ src, alt }) => {
  return <SVG src={src} alt={alt} className="w-full my-[4rem] "></SVG> 
};

const OverviewImage = ({ src, alt }) => {
  return (
    <div className="img-container">
      <img src={src} alt={alt} />
    </div> 
  )
}

export { OverviewSection, OverviewSVG, OverviewImage };

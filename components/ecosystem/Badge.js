import classnames from "classnames";
export default function EcosystemBadge({ type }) {
    return (
        <div
            className={classnames(
                "uppercase font-bold text-white text-xs w-fit rounded-lg mb-2 px-2 py-1",
                {
                    "bg-[#B37ED7]": type === "Organization",
                    "bg-[#83b2d4]": type === "Application",
                    "bg-wall-600": type === "Podcast",
                    "bg-[#8dd5b1]": type === "Marketplace",
                    "bg-[#B5966D]": type === "Article",
                    "bg-[#219DFF]": type === "Group",
                }
            )}
        >
            {type}
        </div>
    );
}
import NewsletterSignup from "./NewletterSignup";
import { name, contact } from "../lib/constants";
import Link from "next/link";

export default function Contact({
  emphasize,
  ecosystem = false,
  className = "",
}) {
  const linkText = emphasize ? "text-green-400" : "text-wall-600";
  const border = emphasize ? "border-green-400" : "border-wall-600";

  return (
    <div className={className}>
      <div className="measure">
        <h4 className="pb-6">
          Sign up for the Urbit Newsletter for a monthly Spotlight summary, and
          more Urbit news.
        </h4>
      </div>
      <NewsletterSignup color={border} />
    </div>
  );
}

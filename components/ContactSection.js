import NewsletterSignup from "../../components/NewletterSignup";
import { name, contact } from "../../lib/constants";

export default function () {
  return (
    <section className="layout-narrow">
      <div className="measure">
        <h4 className="pb-6">
          If you’d like to follow our progress, we send monthly updates via
          email:
        </h4>
      </div>
      <NewsletterSignup color="black" />
      <h4 className="mt-12 text-gray">
        Follow us on{" "}
        <a className="text-black" href={contact.twitter}>
          Twitter
        </a>
      </h4>
      <h4 className="mt-6 text-gray">
        Explore code on{" "}
        <a className="text-black" href={contact.github}>
          Github
        </a>
      </h4>
      <h4 className="mt-6 text-gray">
        Ask questions in our{" "}
        <a className="text-black" href={contact.discord}>
          Discord
        </a>
      </h4>
      <h4 className="mt-6 text-gray">
        Boot Urbit and join{" "}
        <code className="bg-wall p-2 rounded-lg">{contact.urbitCommunity}</code>
      </h4>
    </section>
  );
}

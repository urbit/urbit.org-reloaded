import Link from "next/link";
import Container from "../../components/Container";
import Section from "../../components/Section";
import SingleColumn from "../../components/SingleColumn";
import { useInputChange } from "../../lib/hooks";

const SubmissionPage = () => {
  const [form, handleFormChange] = useInputChange();

  const href = `https://github.com/urbit/urbit.org/new/master?filename=/content/application/${
    form?.shortcode
  }.md&value=${encodeURIComponent(
    `+++
title = "${form?.appName}"
shortcode = "${form?.shortcode}"
license = "${form?.license || ""}"
image = "${form?.imageUrl || ""}"
developer = "${form?.developer || ""}"
website = "${form?.website || ""}"
+++

${form?.description || ""}`
  )}`;

  return (
    <Container>
      <SingleColumn>
        <Section narrow className="space-y-12">
          <div className="flex flex-col space-y-4">
            <h2>Submit your application</h2>
            <p>
              Application submissions are accomplished through a GitHub pull
              request.
            </p>
            <p>
              You’ll need <a href="https://github.com">a GitHub account</a>{" "}
              before you get started to submit your group.
            </p>
            <p>
              First, enter your information and then click “Submit with GitHub.”
              You’ll be directed to a GitHub pull request page with a
              pre-populated markdown file. Click “Propose new file,” and then
              “Create pull request” on the following page.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3>Enter your application information</h3>
            <div className="flex flex-col">
              <p>Application name (required)</p>
              <input
                className="bg-wall-100 p-2"
                name="appName"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>
                Shortcode (e.g. <code>~paldev/pals</code>) (required)
              </p>
              <input
                className="bg-wall-100 p-2"
                name="shortcode"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>App image URL</p>
              <input
                className="bg-wall-100 p-2"
                name="imageUrl"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>License (e.g. MIT)</p>
              <input
                className="bg-wall-100 p-2"
                name="license"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Developer</p>
              <input
                className="bg-wall-100 p-2"
                name="developer"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Website</p>
              <input
                className="bg-wall-100 p-2"
                name="website"
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col">
              <p>Description</p>
              <textarea
                className="resize-none bg-wall-100 p-2 h-60"
                name="description"
                onChange={handleFormChange}
              />
            </div>
          </div>
          <button
            className="button-lg bg-wall-600 text-wall-100"
            onClick={() => window.open(href)}
          >
            Submit with GitHub
          </button>
          <Link href="/">
            <a className="text-xl pt-8 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
};

export default SubmissionPage;

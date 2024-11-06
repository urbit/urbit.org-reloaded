"use client";

import { useState } from "react";
import React from "react";
import classNames from "classnames";

export const NewsletterSignup = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.EMAIL.value;
    const script = document.createElement("script");
    const url = `https://urbit.us11.list-manage.com/subscribe/post-json?u=972a03db9e0c6c25bb58de8c8&id=be143888d2&EMAIL=${encodeURIComponent(email)}&c=callbackFunction`;


    // Set script source to Mailchimp with callback
    script.src = url;

    // Define callback function in the window to handle the response
    window.callbackFunction = (data) => {
      if (data.result === "success") {
        setStatusMessage("Thank you");
        setSuccess(true);
      } else {
        setStatusMessage("There was an error, please try again.");
        setSuccess(false);
        setTimeout(() => {
          setStatusMessage("");
        }, 3000);
      }
    };

    // Append script to body
    document.body.appendChild(script);

    // Clean up the script tag after execution
    document.body.removeChild(script);
  };

  return (
    <React.Fragment>
      {!statusMessage && (
        <form
          onSubmit={handleSubmit}
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate form max-w-screen-sm"
          noValidate
        >
          <div className="input-group font-medium" id="mc_embed_signup_scroll">
            <div className="mc-field-group w-[84svw] md:w-[27rem] relative">
              <input
                className="appearance-none placeholder:text-white outline-none bg-transparent border-gray-87 border-[.0875rem] rounded-[.34rem] pb-[.05em] pl-[.3em] pr-1 w-full mb-8 h-[2.125rem]"
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                placeholder="Stay up to date"
                required
              />
              <div className="flex h-[2.125rem] items-center justify-center absolute top-0 right-0">
                <button
                  id="mc-embedded-subscribe"
                  className="body-lg text-20px text-gray-87 hover:text-white bg-transparent pr-[.4em]"
                  type="submit"
                  name="subscribe"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      {statusMessage && (
        <div className="mb-8 w-max flex items-center justify-center text-sm">
          <div
            className={classNames("button !text-20px !bg-gray-87")}
          >
            {statusMessage}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

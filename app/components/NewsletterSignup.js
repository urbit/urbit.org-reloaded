"use client";

import { useState } from "react";
import React from "react";
import classNames from "classnames";
import { usePathname } from 'next/navigation'

export const NewsletterSignup = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [email, setEmail] = useState(""); // Track input value
  const path = usePathname();

  const isHomepage = path === "/";

  const handleSubmit = (event) => {
    
    event.preventDefault();

    const emailInput = event.target.EMAIL.value;
    const script = document.createElement("script");
    
    // old mc method: post instead of post-json: const url = `https://urbit.us11.list-manage.com/subscribe/post-json?u=972a03db9e0c6c25bb58de8c8&id=be143888d2&EMAIL=${encodeURIComponent(emailInput)}&c=callbackFunction`;
    const url = `https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&id=be143888d2&EMAIL=${encodeURIComponent(emailInput)}&c=callbackFunction`;
    
    // Set script source to Mailchimp with callback
    script.src = url;

    // Define callback function in the window to handle the response
    window.callbackFunction = (data) => {
      if (data.result === "success") {
        setEmail("You are subscribed.");
        setSuccess(true);
      } else {
        setEmail("Error. Try again.");
        setSuccess(false);
      }
    };

    // Append script to body
    document.body.appendChild(script);

    // Clean up the script tag after execution
    document.body.removeChild(script);
  };

  return (
    <React.Fragment>
        <form
          onSubmit={handleSubmit}
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate form pb-6 md:pb-8"
          noValidate
        >
          
          <div className="input-group relative font-medium" id="mc_embed_signup_scroll">
            <div className={classNames(
              isHomepage ? 'max-w-[680px] 2xl:max-w-[888px] ' : 'max-w-[588px]',
              "mc-field-group  h-max relative")}>
              <input
                className={classNames(
                  email.length > 0 && !isSuccess && "text-white border-white",
                  isHomepage ? 'text-size-homepage border-[.1rem] md:border-[.15rem]' : 'text-xlarge border-[.0875rem] pt-[.1rem] pb-[.2rem]',
                  isSuccess ? "bg-[#878787] text-black cursor-default border-none" : 'text-gray-87 bg-transparent ',
                  "appearance-none font-[300] placeholder:font-[300]  placeholder:text-gray-87 outline-none border-gray-87  rounded-[.3125rem] pb-[.05em] pl-[.3em] pr-1 w-full leading-[1cap]")
                }
                disabled={isSuccess}
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
              />
              {email.length > 0 && !isSuccess && ( // Only show the button if input length > 0
                <div id="subscribe" className="flex font-[300] items-center justify-center absolute h-full top-0 right-0">
                  <button
                    id="mc-embedded-subscribe"
                    className={classNames(
                      email.length > 0 && "text-gray-87 hover:text-white",
                      isHomepage ? 'text-size-homepage ' : 'text-xlarge leading-[150%]',
                      "body-lg text-gray-87 hover:text-white leading-[1cap] bg-transparent pr-[.4em]"
                    )}
                    type="submit"
                    name="subscribe"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
    </React.Fragment>
  );
};

'use client'

export const NewsletterSignup = () => {
  return (
    <form
      action="https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;amp;id=be143888d2"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate form max-w-screen-sm"
      target="_blank"
      noValidate
    >
      <div className="input-group font-medium" id="mc_embed_signup_scroll">
        <div className="mc-field-group  w-[27rem] relative">
          <input
            className="appearance-none placeholder:text-white outline-none  bg-transparent border-gray-87 border-[.0875rem] rounded-[.34rem] pb-[.05em] pl-[.3em] pr-1 w-full mb-2 h-[2.125rem]"
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="Stay up to date"
          />
          <div className="flex h-[2.125rem] items-center justify-center absolute top-0 right-0 ">
            <button
              id="mc-embedded-subscribe"
              className="body-lg text-21px text-gray-87 hover:text-white bg-transparent pr-[.4em]"
              type="submit"
              name="subscribe"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
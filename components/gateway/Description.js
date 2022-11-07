import { Markdown } from "@urbit/foundation-design-system";

const Description = ({ description, fallback, markdown }) => {
  return (
    (description !== fallback || markdown) && (
      <div className="flex flex-col space-y-4">
        {markdown ? (
          <div className="markdown">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
        ) : (
          <p>{description}</p>
        )}
      </div>
    )
  );
};

export default Description;

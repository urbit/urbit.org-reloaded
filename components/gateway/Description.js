import { decode } from "html-entities";
import Markdown from "../Markdown";

const Description = ({ description, fallback, markdown }) => {
  return (
    (description !== fallback || markdown) && (
      <div className="flex flex-col space-y-4">
        <p className="font-bold text-wall-400">Description</p>
        {markdown ? <Markdown post={markdown} /> : <p>{description}</p>}
      </div>
    )
  );
};

export default Description;

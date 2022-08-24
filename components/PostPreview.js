import {
  Card,
  formatDate,
  generateDisplayDate,
} from "@urbit/foundation-design-system";

export default function PostPreview(props) {
  const section = props?.section ? props.section : "blog";

  const date = generateDisplayDate(props.post.date);
  return (
    <Card
      slug={`/${section}/${props.post.slug}`}
      image={props.post.extra.image}
      title={props?.title || props.post?.title || ""}
      author={props.post?.extra?.author || ""}
      ship={props.post?.extra?.ship || ""}
      content={
        <div className="text-wall-500 type-sub mt-1">{formatDate(date)}</div>
      }
    />
  );
}

PostPreview.defaultProps = {
  className: "",
};

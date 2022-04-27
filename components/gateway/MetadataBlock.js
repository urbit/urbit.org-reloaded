const MetadataBlock = ({ title, content }) => (
  <div className="flex flex-col basis-1/2 md:basis-auto mb-4 md:mb-0">
    <p className="font-bold text-wall-400">{title}</p>
    <p className="font-mono">{content}</p>
  </div>
);

export default MetadataBlock;

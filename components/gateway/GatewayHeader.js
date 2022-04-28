import GatewayImage from "./Image";

const GatewayHeader = ({ image, patp, error, title, item }) => {
  return (
    <div className="flex items-center space-x-4">
      <GatewayImage patp={patp} image={image} error={error} />
      <div className="flex flex-col">
        <h2>{title}</h2>
        <p>{item}</p>
      </div>
    </div>
  );
};

export default GatewayHeader;

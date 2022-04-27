const GatewayHeader = ({ image, sigil, title, item }) => {
  return (
    <div className="flex items-center space-x-4">
      {image ? (
        <img className="rounded-xl" src={image} height={100} width={100} />
      ) : (
        !sigil && (
          <img
            className="object-contain shadow-sm rounded-xl"
            style={{ height: 100, width: 100 }}
            src="https://media.urbit.org/logo/urbit-logo-card.png"
          />
        )
      )}
      {sigil && sigil}
      <div className="flex flex-col">
        <h2>{title}</h2>
        <p>{item}</p>
      </div>
    </div>
  );
};

export default GatewayHeader;

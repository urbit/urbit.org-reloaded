export function Name({ children, className }) {
  return <b className={`font-normal ${className || ""}`}>{children}</b>;
}

export function Patp({ children, className }) {
  return <code className={`font-mono ${className || ""}`}>{children}</code>;
}

// Used to render a human name alongside their @p
export function Person({
  name,
  patp,
  nameClassNames,
  patpClassNames,
  className,
}) {
  return (
    <>
      {patp && name ? (
        <>
          <Name className={nameClassNames}>{name}</Name>{" "}
          <Patp className={patpClassNames + " opacity-60"}>{patp}</Patp>
        </>
      ) : patp ? (
        <Patp className={patpClassNames}>{patp}</Patp>
      ) : name ? (
        <Name className={nameClassNames}>{name}</Name>
      ) : null}
    </>
  );
}

// This goes inside a <p/> tag
export function ReadableList({ children, serial = ",", conjunction = "and" }) {
  return (
    <>
      {children.map((Child, index) => {
        if (index < children.length - 2) {
          return (
            <>
              {Child}
              {serial}
            </>
          );
        } else if (index < children.length - 1) {
          return (
            <>
              {Child} {conjunction}{" "}
            </>
          );
        }
        return <>{Child}</>;
      })}
    </>
  );
}

export function ShowOrHide({ children, condition }) {
  if (condition) {
    return children;
  }
  return null;
}

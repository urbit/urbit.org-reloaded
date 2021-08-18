export function Name({ children, className }) {
  return (
    <b className={`type-sub font-normal ${className || ""}`}>{children}</b>
  );
}

export function Patp({ children, className }) {
  return (
    <code className={`type-sub opacity-50 font-mono ${className || ""}`}>
      {children}
    </code>
  );
}

// Used to render a human name alongside their @p
export function Person({ person, nameClassNames, patpClassNames, className }) {
  return (
    <>
      {person.patp && person.name ? (
        <>
          <Name className={nameClassNames}>{person.name}</Name>{" "}
          <Patp className={patpClassNames}>{person.patp}</Patp>
        </>
      ) : person.patp ? (
        <Patp className={patpClassNames}>{person.patp}</Patp>
      ) : person.name ? (
        <Name className={nameClassNames}>{person.name}</Name>
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

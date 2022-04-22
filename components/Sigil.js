import { sigil, reactRenderer } from "@tlon/sigil-js";

export const Sigil = ({ patp, size }) => {
  return (
    <>
      {sigil({
        patp: patp,
        renderer: reactRenderer,
        size: size,
        colors: ["black", "white"],
      })}
    </>
  );
};

export default Sigil;

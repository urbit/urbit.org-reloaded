import { index } from "../../cache/data";

export default (req, res) => {
  const results = index.filter(
    (e) =>
      e.title?.toLowerCase().includes(req.query.q) ||
      e?.slug.includes(req.query.q)
  );
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};

import Biography from "@/models/Biography";
import dbConnect from "@/services/dbConnect";

export default async function biographyHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const biography = await Biography.findById(req.query.id);
        return res.status(200).json(biography);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

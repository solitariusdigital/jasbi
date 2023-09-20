import Publication from "@/models/Publication";
import dbConnect from "@/services/dbConnect";

export default async function publicationHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const publication = await Publication.findById(req.query.id);
        return res.status(200).json(publication);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

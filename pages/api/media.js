import Media from "@/models/Media";
import dbConnect from "@/services/dbConnect";

export default async function mediaHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const media = await Media.findById(req.query.id);
        return res.status(200).json(media);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

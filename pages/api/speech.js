import Speech from "@/models/Speech";
import dbConnect from "@/services/dbConnect";

export default async function speechHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const speech = await Speech.findById(req.query.id);
        return res.status(200).json(speech);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

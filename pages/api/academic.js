import Academic from "@/models/Academic";
import dbConnect from "@/services/dbConnect";

export default async function academicHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const academic = await Academic.findById(req.query.id);
        return res.status(200).json(academic);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

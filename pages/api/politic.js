import Politic from "@/models/Politic";
import dbConnect from "@/services/dbConnect";

export default async function politicHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const politic = await Politic.findById(req.query.id);
        return res.status(200).json(politic);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

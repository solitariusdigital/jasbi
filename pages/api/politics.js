import Politic from "@/models/Politic";
import dbConnect from "@/services/dbConnect";

export default async function politicsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newPolitic = await Politic.create(body);
        return res.status(200).json(newPolitic);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const politics = await Politic.find();
        return res.status(200).json(politics);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatePolitic = await Politic.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatePolitic) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updatePolitic);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

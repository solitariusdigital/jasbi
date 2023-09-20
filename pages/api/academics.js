import Academic from "@/models/Academic";
import dbConnect from "@/services/dbConnect";

export default async function academicsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newAcademic = await Academic.create(body);
        return res.status(200).json(newAcademic);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const academics = await Academic.find();
        return res.status(200).json(academics);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateAcademic = await Academic.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateAcademic) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateAcademic);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

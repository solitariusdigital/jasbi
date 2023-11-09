import Biography from "@/models/Biography";
import dbConnect from "@/services/dbConnect";

export default async function biographysHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newBiography = await Biography.create(body);
        return res.status(200).json(newBiography);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const biographys = await Biography.find();
        return res.status(200).json(biographys);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateBiography = await Biography.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateBiography) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateBiography);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

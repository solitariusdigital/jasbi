import Speech from "@/models/Speech";
import dbConnect from "@/services/dbConnect";

export default async function speechesHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newSpeech = await Speech.create(body);
        return res.status(200).json(newSpeech);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const speeches = await Speech.find();
        return res.status(200).json(speeches);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateSpeech = await Speech.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateSpeech) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateSpeech);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

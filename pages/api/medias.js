import Media from "@/models/Media";
import dbConnect from "@/services/dbConnect";

export default async function mediasHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newMedia = await Media.create(body);
        return res.status(200).json(newMedia);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const medias = await Media.find();
        return res.status(200).json(medias);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updateMedia = await Media.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updateMedia) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updateMedia);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

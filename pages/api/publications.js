import Publication from "@/models/Publication";
import dbConnect from "@/services/dbConnect";

export default async function publicationsHandler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=10");
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newPublication = await Publication.create(body);
        return res.status(200).json(newPublication);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "GET":
      try {
        const publications = await Publication.find();
        return res.status(200).json(publications);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatePublication = await Publication.findByIdAndUpdate(
          body.id || body["_id"],
          body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatePublication) {
          return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json(updatePublication);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
}

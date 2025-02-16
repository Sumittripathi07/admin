import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "POST") {
    const {
      id,
      name,
      company,
      price,
      colors,
      image,
      description,
      category,
      featured,
      shipping,
      stock,
    } = req.body;

    const productDoc = await Product.create({
      id,
      name,
      company,
      price,
      colors,
      image,
      description,
      category,
      featured,
      shipping,
      stock,
    });

    res.json(productDoc);
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const {
      id,
      name,
      company,
      price,
      colors,
      image,
      description,
      category,
      featured,
      shipping,
      stock,
      _id,
    } = req.body;

    await Product.updateOne(
      { _id },
      {
        id,
        name,
        company,
        price,
        colors,
        image,
        description,
        category,
        featured,
        shipping,
        stock,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}

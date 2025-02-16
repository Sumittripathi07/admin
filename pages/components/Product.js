import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import toast from "react-hot-toast";

export default function Product({
  _id,
  name: existingName,
  company: existingCompany,
  price: existingPrice,
  colors: existingColors,
  image: existingImage,
  description: existingDescription,
  category: selectedCategory,
  featured: existingFeatured,
  shipping: existingShipping,
}) {
  const [name, setName] = useState(existingName || "");
  const [company, setCompany] = useState(existingCompany || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [colors, setColors] = useState(existingColors || []);
  const [image, setImage] = useState(existingImage || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(selectedCategory || "");
  const [featured, setFeatured] = useState(existingFeatured || false);
  const [shipping, setShipping] = useState(existingShipping || false);
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Set predefined categories
    const predefinedCategories = [
      { _id: "1", name: "mobile" },
      { _id: "2", name: "laptop" },
      { _id: "3", name: "computer" },
      { _id: "4", name: "accessories" },
      { _id: "5", name: "watch" },
    ];
    setCategories(predefinedCategories);
  }, []);

  async function createProduct(ev) {
    ev.preventDefault();

    // Check if there are new images to upload
    if (isUploading) {
      // Wait for the images to finish uploading
      await Promise.all(uploadImagesQueue);
    }

    // Now you can make the API request to save the product
    const data = {
      name,
      company,
      price,
      colors,
      image,
      description,
      category,
      featured,
      shipping,
    };
    console.log("UI", data);

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
      toast.success("Product updated!!");
    } else {
      await axios.post("/api/products", data);
      toast.success("Product created!!");
    }

    // Redirect after saving
    setRedirect(true);
  }

  async function uploadImage(ev) {
    const file = ev.target?.files[0];
    if (file) {
      setIsUploading(true);

      const data = new FormData();
      data.append("file", file);

      // Use the axios.post method and push the promise to the queue
      uploadImagesQueue.push(
        axios.post("/api/upload", data).then((res) => {
          console.log("img", res.data);

          setImage(res.data.links[0]);
        })
      );

      // Wait for the image to finish uploading
      await Promise.all(uploadImagesQueue);

      setIsUploading(false);
      toast.success("Image uploaded");
    } else {
      toast.error("An error occurred!");
    }
  }

  if (redirect) {
    router.push("/products");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={createProduct} className="space-y-5">
        {/* Name input */}
        <div className="grid items-center grid-cols-2 my-4">
          <label className="block col-span-1 mb-3 text-lg font-medium text-gray-700">
            Name
          </label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Name of product"
              required
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
        </div>

        {/* Company input */}
        <div className="grid items-center grid-cols-2 my-4">
          <label className="block col-span-1 mb-3 text-lg font-medium text-gray-700">
            Company
          </label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Company name"
              required
              value={company}
              onChange={(ev) => setCompany(ev.target.value)}
            />
          </div>
        </div>

        {/* Category select */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-900"
          >
            Select Category
          </label>
          <select
            id="category"
            className="mt-1.5 p-3 w-full rounded-md border border-gray-300 text-gray-700"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option value="0">No category selected</option>
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="mr-2 text-lg font-medium text-gray-700">
              Image
            </label>
            <div className="flex items-center justify-center rounded-lg">
              <label
                htmlFor="fileInput"
                className="flex items-center gap-1.5 px-3 py-2 text-center text-sm font-medium text-gray-500 border cursor-pointer hover:border-primary-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Upload
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={uploadImage}
              />
            </div>
          </div>

          {/* Spinner during upload */}
          <div className="grid items-center grid-cols-2 rounded">
            {isUploading && (
              <Spinner className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            )}
          </div>

          {/* Display uploaded image */}
          {!isUploading && image && (
            <div className="relative group">
              <img
                src={image}
                alt="image"
                className="object-cover h-32 p-2 transition-transform border rounded-md cursor-pointer w-44 transform-gpu group-hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Description input */}
        <div className="grid items-center grid-cols-2 my-4">
          <label className="block col-span-1 mb-3 text-lg font-medium text-gray-700">
            Description
          </label>
          <div className="col-span-2">
            <textarea
              type="text"
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Description about the product"
              rows={6}
              required
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
        </div>

        {/* Colors input */}
        <div className="grid items-center grid-cols-2 my-4">
          <label className="block col-span-1 mb-3 text-lg font-medium text-gray-700">
            Color Options
          </label>
          <div className="col-span-2">
            <input
              type="text"
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Colors (comma separated)"
              required
              value={colors}
              onChange={(ev) => setColors(ev.target.value.split(","))}
            />
          </div>
        </div>

        {/* Price input */}
        <div className="grid items-center grid-cols-2 my-4">
          <label className="block col-span-1 mb-3 text-lg font-medium text-gray-700">
            Price
          </label>
          <div className="col-span-2">
            <input
              type="number"
              className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Price"
              required
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        {/* Featured checkbox */}
        <div className="flex items-center my-4">
          <input
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
            checked={featured}
            onChange={(ev) => setFeatured(ev.target.checked)}
          />
          <label className="ml-2 text-lg font-medium text-gray-700">
            Featured
          </label>
        </div>

        {/* Shipping checkbox */}
        <div className="flex items-center my-4">
          <input
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
            checked={shipping}
            onChange={(ev) => setShipping(ev.target.checked)}
          />
          <label className="ml-2 text-lg font-medium text-gray-700">
            Shipping
          </label>
        </div>

        {/* Save button */}
        <div className="items-center my-4">
          <div className="col-span-2 col-start-2">
            <button
              type="submit"
              className="rounded-lg border border-slate-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-black shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
            >
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

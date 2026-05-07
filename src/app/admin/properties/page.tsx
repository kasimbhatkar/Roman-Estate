import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import AdminPropertiesClient from "./AdminPropertiesClient";

export const dynamic = "force-dynamic";

async function getProperties() {
  try {
    await connectDB();
    const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(properties));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function AdminProperties() {
  const properties = await getProperties();

  return <AdminPropertiesClient initialProperties={properties} />;
}

import connectDB from "@/lib/mongodb";
import Partner from "@/models/Partner";
import AdminPartnersClient from "./AdminPartnersClient";

export const dynamic = "force-dynamic";

async function getPartners() {
  try {
    await connectDB();
    const partners = await Partner.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(partners));
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
}

export default async function AdminPartners() {
  const partners = await getPartners();

  return <AdminPartnersClient initialPartners={partners} />;
}

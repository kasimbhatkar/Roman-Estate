import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({}).sort({ createdAt: -1 });
    return NextResponse.json(properties);
  } catch (error: any) {
    console.error("API GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Ensure numeric fields are correctly typed
    const propertyData = {
      ...data,
      price: Number(data.price),
      bedrooms: Number(data.bedrooms || 0),
      bathrooms: Number(data.bathrooms || 0),
      size: Number(data.size),
      featured: Boolean(data.featured),
    };

    const property = await Property.create(propertyData);
    revalidatePath("/properties");
    revalidatePath("/admin/properties");
    return NextResponse.json(
      { message: "Property created successfully", property },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create property",
        details: error.errors
          ? Object.keys(error.errors).map((key) => ({
              field: key,
              message: error.errors[key].message,
            }))
          : null,
      },
      { status: 500 },
    );
  }
}

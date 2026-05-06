import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: 'Please fill all required fields' }, { status: 400 });
    }

    const inquiry = await Inquiry.create(data);
    return NextResponse.json({ message: 'Inquiry submitted successfully', inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

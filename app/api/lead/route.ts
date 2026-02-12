import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

type LeadData = {
  employmentType: string;
  income: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  timestamp?: string;
};

const LEADS_FILE = path.join(process.cwd(), "leads.json");
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || "https://webhook.placeholder.example/lead";

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();

    // Validate required fields
    if (
      !body.employmentType ||
      !body.income ||
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.city
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add timestamp
    const leadWithTimestamp = {
      ...body,
      timestamp: new Date().toISOString(),
    };

    // Read existing leads or create empty array
    let leads: LeadData[] = [];
    if (existsSync(LEADS_FILE)) {
      const fileContent = await readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(fileContent);
    }

    // Append new lead
    leads.push(leadWithTimestamp);

    // Save to file
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");

    // Send webhook notification (non-blocking)
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "new_lead",
        data: leadWithTimestamp,
      }),
    }).catch((err) => console.error("Webhook failed:", err));

    return NextResponse.json(
      { success: true, message: "Lead saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

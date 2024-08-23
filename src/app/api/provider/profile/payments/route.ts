import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const jwtProvider = request.cookies.get("jwt-provider");
  const railsUrl = process.env.RAILS_URL;

  if (!jwtProvider) {
    return NextResponse.json({ error: "No jwt" }, { status: 401 });
  }
  const token = jwtProvider.value;
  try {
    const response = await axios.post(
      `${railsUrl}/api/v1/stripe_integration/create_connected_account`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error creating connected account:", error);
    return NextResponse.json(
      { error: "Failed to create connected account" },
      { status: 500 }
    );
  }
}

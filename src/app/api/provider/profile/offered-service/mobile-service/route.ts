import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(request: NextRequest) {
  const jwtProvider = request.cookies.get("jwt-provider");
  const railsUrl = process.env.RAILS_URL;

  if (!jwtProvider) {
    return NextResponse.json({ error: "No jwt" }, { status: 401 });
  }
  const token = jwtProvider.value;

  try {
    const body = await request.json();
    const { id, is_mobile } = body;
    const response = await axios.patch(
      `${railsUrl}/api/v1/providers/provider_services/${id}`,
      {
        provider_service: { is_mobile },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error updating isMobile:", error);
    return NextResponse.json(
      { error: "Failed to update isMobile" },
      { status: 500 }
    );
  }
}

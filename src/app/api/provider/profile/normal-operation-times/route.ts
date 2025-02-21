import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const jwtProvider = request.cookies.get("jwt-provider");
  const railsUrl = process.env.RAILS_URL;

  if (!jwtProvider) {
    return NextResponse.json({ error: "No jwt" }, { status: 401 });
  }
  const token = jwtProvider.value;
  try {
    const response = await axios.get(
      `${railsUrl}/api/v1/providers/providers_business_info/providers_availabilities/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching operation info:", error);
    return NextResponse.json(
      { error: "Failed to fetch operation info" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const jwtProvider = request.cookies.get("jwt-provider");
  const railsUrl = process.env.RAILS_URL;

  if (!jwtProvider) {
    return NextResponse.json({ error: "No jwt" }, { status: 401 });
  }
  const token = jwtProvider.value;
  try {
    const body = await request.json();

    const filteredAvailabilities = body.providers_availabilities.map(
      (availability: any) => ({
        id: availability.id,
        day_of_week: availability.day_of_week,
        start_time: availability.start_time,
        end_time: availability.end_time,
        is_closed: availability.is_closed,
      })
    );

    const response = await axios.patch(
      `${railsUrl}/api/v1//providers/providers_business_info/providers_availabilities/bulk_update`,
      {
        providers_availabilities: filteredAvailabilities,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error updating operation info:", error);
    return NextResponse.json(
      { error: "Failed to update operation info" },
      { status: 500 }
    );
  }
}

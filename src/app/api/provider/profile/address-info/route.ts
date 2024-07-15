import type { NextRequest } from "next/server";
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const jwtProvider = request.cookies.get('jwt-provider');
  const railsUrl = process.env.RAILS_URL;


  if (!jwtProvider) {
    return NextResponse.json({ error: 'No jwt' }, { status: 401 });
  }
  const token = jwtProvider.value
  try {
    
    const response = await axios.get(
      `${railsUrl}/api/v1/providers/providers_business_info?fields=street_address_one,street_address_two,city,state,zip`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching business info:', error);
    return NextResponse.json({ error: 'Failed to fetch business info' }, { status: 500 });
  }
}
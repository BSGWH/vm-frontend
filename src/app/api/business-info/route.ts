
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
      `${railsUrl}/api/v1/providers/providers_business_info?fields=company_name,phone_number,year_of_experience`,
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


export async function PATCH(request: NextRequest) {
  const jwtProvider = request.cookies.get('jwt-provider');
  const railsUrl = process.env.RAILS_URL;

  if (!jwtProvider) {
    return NextResponse.json({ error: 'No jwt' }, { status: 401 });
  }
  const token = jwtProvider.value;
  try {
    const body = await request.json();
    const response = await axios.patch(
      `${railsUrl}/api/v1/providers/providers_business_info`,
      {
        company_name: body.company_name,
        phone_number: body.phone_number,
        year_of_experience: body.year_of_experience,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating business info:', error);
    return NextResponse.json({ error: 'Failed to update business info' }, { status: 500 });
  }
}
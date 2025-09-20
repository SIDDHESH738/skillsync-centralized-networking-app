import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'SkillSync API is working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      message: 'Data received successfully',
      data: body,
      timestamp: new Date().toISOString(),
      status: 'success'
    })
  } catch (error) {
    return NextResponse.json({ 
      message: 'Error processing request',
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error'
    }, { status: 400 })
  }
}


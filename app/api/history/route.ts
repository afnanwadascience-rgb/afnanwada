import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  return NextResponse.json({ success: true, history: historyList }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing item ID parameter' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: `Analysis ${id} deleted successfully` }, { status: 200 });
}
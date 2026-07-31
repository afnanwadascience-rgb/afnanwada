import { NextRequest, NextResponse } from "next/server";

const historyList: any[] = [];

export async function GET(req: NextRequest) {
  return NextResponse.json(
    {
      success: true,
      history: historyList,
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const index = historyList.findIndex((item) => item.id === id);

    if (index !== -1) {
      historyList.splice(index, 1);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Analysis ${id} deleted successfully`,
      },
      { status: 200 }
    );
  }

  historyList.length = 0;

  return NextResponse.json(
    {
      success: true,
      message: "History cleared",
    },
    { status: 200 }
  );
}
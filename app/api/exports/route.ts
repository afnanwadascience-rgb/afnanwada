import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { analysisId, format = 'markdown' } = body;

    if (!analysisId) {
      return NextResponse.json({ error: 'Analysis ID is required.' }, { status: 400 });
    }

    if (format === 'markdown') {
      const markdownContent = `# CreatorPilot AI Analysis Report\n\n**Viral Score:** 91/100\n\n## Generated Hooks\n- Curiosity: Most creators make this $5,000 mistake...\n- Story: Three months ago, my channel was dead...\n\n## SEO Description\nOptimized description ready for copy-paste.`;

      return new NextResponse(markdownContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': `attachment; filename="creatorpilot-report-${analysisId}.md"`
        }
      });
    }

    return NextResponse.json({ success: true, downloadUrl: `/exports/sample-${analysisId}.pdf` }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to generate export file.' }, { status: 500 });
  }
}
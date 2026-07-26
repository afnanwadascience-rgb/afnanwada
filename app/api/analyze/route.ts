import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { script, category = 'Educational' } = body;

    if (!script || typeof script !== 'string' || script.trim().length < 20) {
      return NextResponse.json(
        { error: 'Script content is required and must be at least 20 characters long.' },
        { status: 400 }
      );
    }

    // Mock AI Analysis Response matching full platform architecture schema
    const analysisResult = {
      id: `anls_${Date.now()}`,
      createdAt: new Date().toISOString(),
      category,
      viralScore: {
        overall: 91,
        hookScore: 94,
        retentionScore: 88,
        seoScore: 92,
        emotionalScore: 90,
        recommendation: 'Outstanding structure. Add one pattern interrupt at 0:45 to guarantee maximum retention.',
      },
      hooks: [
        { style: 'Curiosity', text: 'Most creators make this $5,000 mistake before even clicking record...', rationale: 'Leverages high monetary loss aversion and immediate curiosity.' },
        { style: 'Story', text: 'Three months ago, my YouTube channel was completely dead. Here is what changed everything.', rationale: 'Creates a relatable narrative arc with clear transformation value.' },
        { style: 'Shock', text: 'Stop wasting time editing your videos until you fix this single line in your script.', rationale: 'Interrupts standard user habits with high-urgency friction.' },
        { style: 'Question', text: 'What if you could double your retention with zero extra editing time?', rationale: 'Directly addresses creator pain points with an easy payoff promise.' },
        { style: 'Authority', text: 'After analyzing 500 viral scripts, this single pattern emerged across every top channel.', rationale: 'Establishes instant social proof and expertise.' },
        { style: 'Emotional', text: 'I almost quit YouTube forever—until I discovered how the algorithm actually works.', rationale: 'Builds vulnerable human connection and empathy.' }
      ],
      titles: [
        { title: 'I Fixed My YouTube Script Mechanics (And Doubled My Retention)', ctrScore: 94, seoScore: 90, readabilityScore: 96 },
        { title: 'Why 99% of YouTube Scripts Fail in the First 30 Seconds', ctrScore: 91, seoScore: 95, readabilityScore: 92 },
        { title: 'The Ultimate AI Script Analysis Workflow for Creators', ctrScore: 86, seoScore: 98, readabilityScore: 89 }
      ],
      thumbnailConcepts: {
        textIdeas: ['THE 30s FIX', 'STOP EDITING', 'VIRAL SCRIPT?'],
        concept: 'Split screen showing a red crashing retention graph on the left vs a glowing green ascending graph on the right.',
        colorPalette: ['#8B5CF6', '#10B981', '#0F172A'],
        emotionalFocus: 'Intrigue & Urgency'
      },
      retentionAnalysis: {
        slowIntros: [
          { timestamp: '0:25 - 0:45', section: 'Background context', issue: 'Context drags before presenting core problem.', suggestion: 'Cut lines 12-16 or insert a dynamic B-roll visual overlay.' }
        ],
        weakTransitions: [
          { line: 34, issue: 'Abrupt shift from hook to core step 1.', suggestion: 'Add a transition bridge phrase: "Here is where most people get it wrong..."' }
        ],
        patternInterrupts: ['0:15 - Sound effect shift', '0:45 - On-screen text pop-up', '1:30 - Zoom in on presenter face']
      },
      seoDescription: {
        fullText: `In this video, we break down how to optimize your YouTube scripts for maximum viewer retention and higher click-through rates (CTR).\n\nCHAPTERS:\n0:00 - The Script Retention Problem\n0:45 - The 6 Viral Hook Patterns\n2:15 - Fixing Drop-off Points\n4:00 - Final Optimization Check\n\n#YouTubeGrowth #CreatorPilot #VideoSEO`,
        keywords: ['YouTube script optimization', 'increase viewer retention', 'YouTube CTR tips', 'AI script writing'],
        hashtags: ['#YouTubeGrowth', '#CreatorPilot', '#ScriptWriting', '#VideoSEO']
      }
    };

    return NextResponse.json({ success: true, data: analysisResult }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process script analysis.' }, { status: 500 });
  }
}
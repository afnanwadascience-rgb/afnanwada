import { NextResponse } from "next/server";

interface HookItem {
  style?: string;
  text?: string;
  rationale?: string;
}

interface TitleItem {
  title?: string;
  ctrScore?: number;
  seoScore?: number;
  readabilityScore?: number;
}

interface ThumbnailConcepts {
  textIdeas?: string[];
  concept?: string;
  colorPalette?: string[];
  emotionalFocus?: string;
}

interface RetentionAnalysis {
  slowIntros?: string[];
  weakTransitions?: string[];
  patternInterrupts?: string[];
}

interface SeoDescription {
  fullText?: string;
  keywords?: string[];
  hashtags?: string[];
}

interface AnalysisData {
  viralScore?: number;
  hooks?: HookItem[];
  titles?: TitleItem[];
  thumbnailConcepts?: ThumbnailConcepts;
  retentionAnalysis?: RetentionAnalysis;
  seoDescription?: SeoDescription;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { analysisData, format = "json" }: { analysisData?: AnalysisData; format?: string } = body;

    if (!analysisData) {
      return NextResponse.json(
        { success: false, error: "No analysis data provided for export." },
        { status: 400 }
      );
    }

    if (format === "markdown" || format === "txt") {
      const isMarkdown = format === "markdown";
      let output = isMarkdown
        ? `# CreatorPilot AI - Script Analysis Export\n\n`
        : `CREATORPILOT AI - SCRIPT ANALYSIS EXPORT\n=========================================\n\n`;

      if (typeof analysisData.viralScore === "number") {
        output += isMarkdown
          ? `## Viral Score: ${analysisData.viralScore}/100\n\n`
          : `VIRAL SCORE: ${analysisData.viralScore}/100\n-----------------------------------------\n\n`;
      }

      if (Array.isArray(analysisData.hooks) && analysisData.hooks.length > 0) {
        output += isMarkdown ? `## Top Viral Hooks\n\n` : `TOP VIRAL HOOKS\n-----------------------------------------\n\n`;
        analysisData.hooks.forEach((hook, i) => {
          const style = hook.style ? `[${hook.style}] ` : "";
          const text = hook.text || "";
          const rationale = hook.rationale
            ? isMarkdown
              ? `\n  - *Rationale:* ${hook.rationale}`
              : `\n  - Rationale: ${hook.rationale}`
            : "";
          output += `${i + 1}. ${style}${text}${rationale}\n\n`;
        });
      }

      if (Array.isArray(analysisData.titles) && analysisData.titles.length > 0) {
        output += isMarkdown ? `## Optimized Video Titles\n\n` : `OPTIMIZED VIDEO TITLES\n-----------------------------------------\n\n`;
        analysisData.titles.forEach((t, i) => {
          const title = t.title || "";
          const ctr = t.ctrScore !== undefined ? `CTR: ${t.ctrScore}%` : "";
          const seo = t.seoScore !== undefined ? `SEO: ${t.seoScore}%` : "";
          const read = t.readabilityScore !== undefined ? `Readability: ${t.readabilityScore}%` : "";
          const scores = [ctr, seo, read].filter(Boolean).join(" | ");
          output += `${i + 1}. ${title}${scores ? (isMarkdown ? `\n   *(${scores})*` : `\n   (${scores})`) : ""}\n\n`;
        });
      }

      if (analysisData.thumbnailConcepts) {
        output += isMarkdown ? `## Thumbnail Concept Strategy\n\n` : `THUMBNAIL CONCEPT STRATEGY\n-----------------------------------------\n\n`;
        if (analysisData.thumbnailConcepts.concept) {
          output += isMarkdown
            ? `**Concept:** ${analysisData.thumbnailConcepts.concept}\n\n`
            : `Concept: ${analysisData.thumbnailConcepts.concept}\n\n`;
        }
        if (analysisData.thumbnailConcepts.emotionalFocus) {
          output += isMarkdown
            ? `**Emotional Focus:** ${analysisData.thumbnailConcepts.emotionalFocus}\n\n`
            : `Emotional Focus: ${analysisData.thumbnailConcepts.emotionalFocus}\n\n`;
        }
        if (Array.isArray(analysisData.thumbnailConcepts.textIdeas) && analysisData.thumbnailConcepts.textIdeas.length > 0) {
          output += isMarkdown ? `**Text Ideas:**\n` : `Text Ideas:\n`;
          analysisData.thumbnailConcepts.textIdeas.forEach((idea) => {
            output += `  - ${idea}\n`;
          });
          output += `\n`;
        }
        if (Array.isArray(analysisData.thumbnailConcepts.colorPalette) && analysisData.thumbnailConcepts.colorPalette.length > 0) {
          output += isMarkdown
            ? `**Color Palette:** ${analysisData.thumbnailConcepts.colorPalette.join(", ")}\n\n`
            : `Color Palette: ${analysisData.thumbnailConcepts.colorPalette.join(", ")}\n\n`;
        }
      }

      if (analysisData.retentionAnalysis) {
        output += isMarkdown ? `## Retention & Pacing Breakdown\n\n` : `RETENTION & PACING BREAKDOWN\n-----------------------------------------\n\n`;
        const ra = analysisData.retentionAnalysis;

        if (Array.isArray(ra.slowIntros) && ra.slowIntros.length > 0) {
          output += isMarkdown ? `**Slow Intros / Risk Points:**\n` : `Slow Intros / Risk Points:\n`;
          ra.slowIntros.forEach((item) => {
            output += `  - ${item}\n`;
          });
          output += `\n`;
        }
        if (Array.isArray(ra.weakTransitions) && ra.weakTransitions.length > 0) {
          output += isMarkdown ? `**Weak Transitions:**\n` : `Weak Transitions:\n`;
          ra.weakTransitions.forEach((item) => {
            output += `  - ${item}\n`;
          });
          output += `\n`;
        }
        if (Array.isArray(ra.patternInterrupts) && ra.patternInterrupts.length > 0) {
          output += isMarkdown ? `**Pattern Interrupts Recommended:**\n` : `Pattern Interrupts Recommended:\n`;
          ra.patternInterrupts.forEach((item) => {
            output += `  - ${item}\n`;
          });
          output += `\n`;
        }
      }

      if (analysisData.seoDescription) {
        output += isMarkdown ? `## SEO Description & Tags\n\n` : `SEO DESCRIPTION & TAGS\n-----------------------------------------\n\n`;
        const seo = analysisData.seoDescription;
        if (seo.fullText) {
          output += isMarkdown ? `**Description:**\n${seo.fullText}\n\n` : `Description:\n${seo.fullText}\n\n`;
        }
        if (Array.isArray(seo.keywords) && seo.keywords.length > 0) {
          output += isMarkdown ? `**Keywords:** ${seo.keywords.join(", ")}\n\n` : `Keywords: ${seo.keywords.join(", ")}\n\n`;
        }
        if (Array.isArray(seo.hashtags) && seo.hashtags.length > 0) {
          const tags = seo.hashtags.map((t) => `#${t.replace(/^#/, "")}`).join(" ");
          output += isMarkdown ? `**Hashtags:** ${tags}\n\n` : `Hashtags: ${tags}\n\n`;
        }
      }

      return NextResponse.json({ success: true, exportContent: output });
    }

    return NextResponse.json({ success: true, data: analysisData });
  } catch (error: any) {
    console.error("Export API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate export" },
      { status: 500 }
    );
  }
}
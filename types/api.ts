export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface AnalyzeScriptRequestPayload {
  script: string;
  category?: string;
  targetDurationSeconds?: number;
}

export interface ToggleFavoriteRequestPayload {
  analysisId: string;
  isFavorite: boolean;
}

export interface ExportReportRequestPayload {
  analysisId: string;
  format: 'markdown' | 'json' | 'pdf';
}
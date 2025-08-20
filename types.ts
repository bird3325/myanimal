
export enum AppState {
  HOME,
  CAPTURE,
  ANALYZING,
  RESULT,
}

export interface AnimalData {
  name: string;
  name_en: string;
  percentage: string;
  themeColor: string;
  themeGradient: string;
  catchphrase: string;
  facial_features: {
    eyes: string;
    nose: string;
    lips: string;
    face_shape: string;
  };
  personality: {
    summary: string;
    strengths: string[];
    weakness: string;
    romance_style: string;
  };
  fortune_2025: {
    total: number;
    romance: number;
    work: number;
    health: number;
    summary: string;
    lucky_color: string;
    lucky_item: string;
  };
  compatibility: {
    best_match: string;
    best_match_reason: string;
    good_match: string;
    good_match_reason: string;
  };
}

export interface ResultsProps {
    is_suicide: {
      suicide_probability: number;
      is_suicide: boolean;
      suicide_mentiond: number;
    };
    is_danger: {
      danger_probability: number;
      is_danger: boolean;
      danger_mentioned: number;
    };
    potential_cause: {};
  }
  
export interface AnalysisResultsProps {
  results: {
    is_suicide: {
      suicide_probability: number;
      is_suicide: boolean;
      suicide_mentiond: number;
    };
    is_danger: {
      danger_probability: number;
      is_danger: boolean;
      danger_mentioned: number;
    };
    potential_cause: {};
  };
}
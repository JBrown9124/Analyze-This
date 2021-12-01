export interface ResultsProps {
  resources: Object[];
  facilities: Object[];
  analysisResults: {
    suicide_stats: {
      suicide_probability: number;
      is_suicide: boolean;
      suicide_mentiond: number;
    };

    danger_stats: {
      danger_probability: number;
      is_danger: boolean;
      danger_mentioned: number;
    };
    potential_causes: {};
  };
  description:string

}



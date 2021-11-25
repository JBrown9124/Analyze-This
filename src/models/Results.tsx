export interface ResultsProps {
  resources: [{name:string, url:string}];
  facilities: Array<Object>;
  analysisResults: {
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
    potential_causes: {};
  };
  description:string

}



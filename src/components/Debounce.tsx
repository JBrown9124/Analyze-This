import { useState } from "react";
import { Input, List } from "antd";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export const Debounce = ({ a}:any) => {
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
      debounce:3000,
      sessionToken:true,
    apiKey: "AIzaSyAubwK3iN_-okxx-NO554BxUjl7efVshng",
  });
  const [value, setValue] = useState("");

  return (
    <div style={{ width: "250px" }}>
      <span>Debounced</span>
      <Input.Search
        style={{ color: "black" }}
        value={value}
        placeholder="Debounce 500 ms"
        onChange={(evt:any) => {
          getPlacePredictions({ input: evt.target.value });
          setValue(evt.target.value);
        }}
        loading={isPlacePredictionsLoading}
      />
      <div
        style={{
          marginTop: "20px",
          width: "200px",
          height: "200px",
          display: "flex",
          flex: "1",
          flexDirection: "column",
          marginBottom: "100px",
        }}
      >
        {!isPlacePredictionsLoading && (
          <List
            dataSource={placePredictions}
            renderItem={(item:any) => (
              <List.Item onClick={() => setValue(item.description)}>
                <List.Item.Meta title={item.description} />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};
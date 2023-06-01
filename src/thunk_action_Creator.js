import axios from "axios";

export const fetchData = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchDataStart());

      const response = await axios.get(
        "https://the-trivia-api.com/v2/questions"
      );
      const data = response.data;

      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const fetchDataStart = () => {
  return { type: "FETCH_DATA_START" };
};

export const fetchDataSuccess = (data) => {
  return { type: "FETCH_DATA_SUCCESS", payload: data };
};

export const fetchDataFailure = (error) => {
  return { type: "FETCH_DATA_FAILURE", payload: error };
};

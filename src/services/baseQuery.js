import httpRequest from "../utils/httpRequest";

const baseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await httpRequest({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return result;
    } catch (err) {
      return {
        error: {
          status: err.response?.data?.status,
          message: err.response?.data?.message,
        },
      };
    }
  };

export default baseQuery;

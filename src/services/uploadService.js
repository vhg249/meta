import { postFormDataAsync } from "@Helpers/request";
const UPLOAD_API_URL = `${process.env.REACT_APP_API_SERVER}/upload/multi`;

const upload = async (data) => {
  try {
    const response = await postFormDataAsync(UPLOAD_API_URL, data);
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const uploadServices = {
  upload
};

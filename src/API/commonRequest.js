import axios from "axios";

export const commonRequest = async (method, url, body, header) => {
   let config = {
      method,
      url,
      data: body,
      headers: header ? header : { "Content-type": "application/json" },
   };

   return await axios(config)
      .then((data) => {
         return data;
      })
      .catch((err) => {
         return err;
      });
};

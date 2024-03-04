import axios, { AxiosResponse } from "axios";

interface Param {
  key: string;
  value: string;
}

interface Header {
  key: string;
  value: string;
}

export const apiRequest = async (
  method: string,
  apiEndpoint: string,
  bodyInput?: string,
  params: Param[] = [],
  header: Header[] = []
): Promise<object> => {
  const apiUrl: string = apiEndpoint;
  let response: AxiosResponse<object>;

  // ***************************************************************************************************************************

  // * Grouping parameters by their keys, ensuring that parameters with the same key are stored together in an array.

  //TODO params=> Returns array of object

  //*  [
  //*    {key: 'category', value: 'phone'}
  //*    {key: 'category', value: 'laptop'}
  //*    {key: 'price', value: '1234'}
  //*                                     ]

  //TODO paramsObj=> Returns object with ket valye pairs

  //* {category: ['phone','laptop']
  //* price: [1234]}

  //? Initializes an empty object paramObj where keys are strings and values are arrays of type any[]. This object will store parameters grouped by their keys.=>
  const paramObj: { [key: string]: string[] } = {};
  // ? Iterates over each parameter object in the params array.=>
  params.forEach((param: Param) => {
    // ? Extracts the key and value properties from each parameter object in the params array.=>
    const { key, value } = param;
    // ? It checks if the paramObj object already has a property with the name key.
    // ? If paramObj does not have a property with the name key, it creates a new property with that name and assigns an array containing the value.
    // ? If paramObj already has a property with the name key, it pushes the value to the existing array associated with that key.=>
    if (!paramObj[key]) {
      paramObj[key] = [value];
    } else {
      paramObj[key].push(value);
    }
  });

  // ******************************************************************************************************************************

  const headerObj: { [key: string]: string[] } = {};
  header.forEach((headerItem: Header) => {
    const { key, value } = headerItem;
    if (!headerObj[key]) {
      headerObj[key] = [value];
    } else {
      headerObj[key].push(value);
    }
  });

  try {
    switch (method) {
      case "get":
        response = await axios.get(apiUrl, {
          params: paramObj,
          headers: headerObj,
        });
        break;
      case "post":
        response = await axios.post(apiUrl, bodyInput, { headers: headerObj });
        break;
      default:
        throw new Error("Invalid method");
    }
    return response.data;
  } catch (error: unknown) {
    return {
      error,
    };
  }
};

// ********************** Checks to see if entered body input is JSON (JSON Input Validator) ******************************

export const isValidJSON = (input: string): boolean | string => {
  try {
    const parsedJson = JSON.parse(input);
    return parsedJson;
  } catch (error) {
    return false;
  }
};

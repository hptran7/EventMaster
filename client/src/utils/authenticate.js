// import axios from "axios";

// export function setAuthenticationHeader(token) {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `${token}`;
//   } else {
//     delete axios.defaults.headers;
//   }
// }

import axios from "axios";

export function setAuthenticationHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

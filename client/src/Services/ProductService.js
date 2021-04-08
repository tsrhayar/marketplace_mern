// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProducts: () => {
    return fetch("/product/").then((response) => {
      if (response.status !== 401) return response.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  getProductsByPriceLTH: () => {
    return fetch("/product/bypricelth").then((response) => {
      if (response.status !== 401) return response.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  getProductsByPriceHTL: () => {
    return fetch("/product/bypricehtl").then((response) => {
      if (response.status !== 401) return response.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  postProduct: (product) => {
    console.log(product);
    return fetch("/product/add", {
      method: "post",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};

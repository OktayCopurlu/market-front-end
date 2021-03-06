import dotenv from "dotenv";
dotenv.config();

const serverUrl = process.env.REACT_APP_SERVER_URL;
const products = `${serverUrl}/products`;

//create Product
export function createProduct(body, isSuccess, getToken) {
  const token = getToken;

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

 return fetch(products, requestOptions)
    .then((response) => {
      if (response.ok) {
        isSuccess(true); //for user message
        return response.json();
      } else {
        isSuccess(false); // user message
        return response.json();
      }
    })
    .then((response) => console.log(response))
    .catch((err) => {
      console.log("Error :" + err);
      return isSuccess(false);
    });
}

//get all Products
export async function getAll() {
  try {
    const list = await fetch(products);
    return await list.json();
  } catch (err) {
    return console.log("error", err);
  }
}

//Product List Filter for canton
export async function filterCanton(canton) {
  try {
    const list = await fetch(`${products}/filter?canton=${canton}`);
    return await list.json();
  } catch (err) {
    return console.log("error", err);
  }
}

//Product List Filter for Category
export async function filterMainCategory(mainCategory) {
  try {
    const list = await fetch(`${products}/filter?mainCategory=${mainCategory}`);
    return await list.json();
  } catch (err) {
    return console.log("error", err);
  }
}

//Product List Filter for Category and Canton same time
export async function filterProductCantonAndCategory(canton, category) {
  try {
    const list = await fetch(
      `${products}/filter?mainCategory=${category}&canton=${canton}`
    );
    return await list.json();
  } catch (err) {
    return  console.log("error", err);
  }
}

//filter products for user
export async function filterProductuserId(userId) {
  try {
    const list = await fetch(products + "/filter?userId=" + userId);
    return await list.json();
  } catch (err) {
    return await console.log("error", err);
  }
}

//Delete Products
export async function deleteProducts(id, token) {
  const tokenString = token;

  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenString}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const list = await fetch(products + "/" + id, requestOptions);
    return await list.json();
  } catch (err) {
    console.log("Deleting error", err);
  }
}

//filter a product and get
export async function filterAndGet(id) {
  try {
    const list = await fetch(products + "/" + id);
    return await list.json();
  } catch (err) {
    console.log("filter product error", err);
  }
}

//edit product
export async function updateProduct(id, body, isSuccess, token) {
  const tokenString = token;
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenString}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const product = await fetch(products + "/edit/" + id, requestOptions);
    if (product.ok) {
      console.log("Product updated successfully");
      return await isSuccess(true); //for user message
    } else {
      console.log("Product couldn't updated ");
      return await isSuccess(false);
    }
  } catch (error) {
    await isSuccess(false); //for user message
    return console.log("Editing Error :" + error);
  }
}

//filter users products
export async function filterUserProducts(userId) {
  try {
    const list = await fetch(`${products}/filter?userId=${userId}`);
    return await list.json();
  } catch (error) {
    return await console.log("Error :" + error);
  }
}

export async function listAction(canton, mainCategory, productContext) {
  
  try {
    //filter for Canton
    if (canton && !mainCategory) {
      const list = await filterCanton(canton);
      return await productContext.stateHandler(list);
    }
    //filter for Category
    if (!canton && mainCategory) {
      const list = await filterMainCategory(mainCategory);
      return await productContext.stateHandler(list);
    }

    //filter for category and canton
    if (canton && mainCategory) {
      const list = await filterProductCantonAndCategory(canton, mainCategory);
      return await productContext.stateHandler(list);
    }

    //list all products
    if (!mainCategory && !canton ) {
      const list = await getAll();
      return await productContext.stateHandler(list); 
    }
  } catch (error) {
    console.log(error);
  }
}

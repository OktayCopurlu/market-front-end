import dotenv from "dotenv";
dotenv.config();

const serverUrl = process.env.REACT_APP_SERVER_URL;
const wishes = `${serverUrl}/wishes`;

//create wish
export async function createWish(body, isSuccess, token) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  fetch(wishes, requestOptions)
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
    .catch((err) => console.log("Error :" + err));
}

//get all Wishes
export async function getAll() {
  try {
    const list = await fetch(wishes);
    return await list.json();
  } catch (err) {
    return await console.log("error", err);
  }
}
//filter wish for user
export async function filterWishUserId(userId) {
  try {
    const list = await fetch(wishes + "/filter?userId=" + userId);
    return await list.json();
  } catch (err) {
    return await console.log("error", err);
  }
}
//Delete Wishes
export async function deleteWishes(id, token) {
  const tokenString = token;
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenString}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const list = await fetch(wishes + "/" + id, requestOptions);
    return await list.json();
  } catch (err) {
    console.log("error", err);
  }
}

//filter a wish and get
export async function filterAndGet(id) {
  try {
    const list = await fetch(wishes + "/" + id);
    return await list.json();
  } catch (err) {
    console.log("error", err);
  }
}

//edit wish
export async function updateWish(id, body, isSuccess, token) {
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
    const wish = await fetch(wishes + "/edit/" + id, requestOptions);
    if (wish.ok) {
      console.log("Wish updated successfully");
      return await isSuccess(true); //for user message
    } else {
      console.log("Wroduct couldn't updated ");

      return await isSuccess(false);
    }
  } catch (error) {
    await isSuccess(false); //for user message
    return console.log("Error :" + error);
  }
}

//filter users wishes

export async function filterUserWishes(userId) {
  try {
    const list = await fetch(`${wishes}/filter?userId=${userId}`);
    return await list.json();
  } catch (error) {
    return await console.log("Error :" + error);
  }
}

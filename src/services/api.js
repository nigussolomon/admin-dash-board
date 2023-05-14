const api_link = "https://bunnabanktna.onrender.com"
export const fetchCategories = async () => {
  const response = await fetch(api_link+"/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  const jsonData = await response.json();
  return jsonData;
};

export const filterTraining = async (id) => {
  console.log("please help me!");
  const response = await fetch(
    api_link+"/trainings?q[category_id_eq]=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
};

export const authenticate = async (email) => {
  const response = await fetch(api_link+"/send_otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: {
        email: email,
      },
    }),
  });
  const res = await response.json();
  console.log(res["message"]);
  if (res["message"] !== undefined) {
    return true;
  } else {
    return res["error"];
  }
};

export const postTraining = async (data) => {
  const response = await fetch(api_link+"/employee_trainings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      employee_training: data,
    }),
  });
  console.log(response.status);
  const res = await response.json();
  console.log(res["message"]);
  if (response.status === 201) {
    return true;
  } else {
    return res["error"];
  }
};

export const verifyAuthenticate = async (otp) => {
  const email = await localStorage.getItem("tempEmail");
  const response = await fetch(api_link+"/verify_otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: {
        email: email,
        otp_code: otp,
      },
    }),
  });
  const res = await response.json();
  if (res["auth_token"] !== undefined) {
    localStorage.setItem("token", res["auth_token"]);
    return true;
  } else {
    return res["error"];
  }
};

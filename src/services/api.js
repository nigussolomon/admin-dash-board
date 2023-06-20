const api_link = process.env.REACT_APP_API_URL
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

export const fetchEmployees = async () => {
  const response = await fetch(api_link+"/employees", {
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

export const filterTraining1 = async (id) => {
  console.log("please help me!");
  const response = await fetch(
    api_link+"/trainings?q[parent_category_eq]=" + id,
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

export const adminFilterTraining = async (filters) => {
  console.log("please help me!");
  const response = await fetch(
    api_link+"/employee_trainings?"+filters,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  const jsonData = await response.json();
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
  const res = await response.json();
  if (response.status === 201) {
    return true;
  } else {
    return res["error"];
  }
};

export const newTraining = async (data) => {
  const response = await fetch(api_link+"/trainings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      training: data,
    }),
  });
  const res = await response.json();
  if (response.status === 201) {
    return res['id'];
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

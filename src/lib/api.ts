import { DATABASE_URL } from "./env";

const get = async (url: string) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${DATABASE_URL}${url}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const post = async (url: string, data: any) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${DATABASE_URL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log(response)
    throw new Error(response.statusText);
  }

  return response.json();
};

const patchRequest = async (url: string, data: any) => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(`${DATABASE_URL}${url}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

const deleteRequest = async (url: string) => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${DATABASE_URL}${url}`, {
        method: "DELETE",
        headers,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}


export { get, post, patchRequest, deleteRequest };
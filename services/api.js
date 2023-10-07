// users api
export const updateUserApi = async (data) => {
  const response = await fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createUserApi = async (data) => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getUserApi = async (id) => {
  const response = await fetch(`/api/user?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getUsersApi = async () => {
  const response = await fetch("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// academic api
export const updateAcademicApi = async (data) => {
  const response = await fetch("/api/academics", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createAcademicApi = async (data) => {
  const response = await fetch("/api/academics", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getAcademicApi = async (id) => {
  const response = await fetch(`/api/academic?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getAcademicsApi = async () => {
  const response = await fetch("/api/academics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// publication api
export const updatePublicationApi = async (data) => {
  const response = await fetch("/api/publications", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createPublicationApi = async (data) => {
  const response = await fetch("/api/publications", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getPublicationApi = async (id) => {
  const response = await fetch(`/api/publication?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getPublicationsApi = async () => {
  const response = await fetch("/api/publications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// politic api
export const updatePoliticApi = async (data) => {
  const response = await fetch("/api/politics", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createPoliticApi = async (data) => {
  const response = await fetch("/api/politics", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getPoliticApi = async (id) => {
  const response = await fetch(`/api/politic?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getPoliticsApi = async () => {
  const response = await fetch("/api/politics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// media api
export const updateMediaApi = async (data) => {
  const response = await fetch("/api/medias", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createMediaApi = async (data) => {
  const response = await fetch("/api/medias", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getMediaApi = async (id) => {
  const response = await fetch(`/api/media?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getMediasApi = async () => {
  const response = await fetch("/api/medias", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

// speech api
export const updateSpeechApi = async (data) => {
  const response = await fetch("/api/speeches", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const createSpeechApi = async (data) => {
  const response = await fetch("/api/speeches", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSpeechApi = async (id) => {
  const response = await fetch(`/api/speech?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
export const getSpeechesApi = async () => {
  const response = await fetch("/api/speeches", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

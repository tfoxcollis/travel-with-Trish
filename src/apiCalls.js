//apiCalls
const getData = (apiName) => {
  return fetch(`https://travel-tracker-api-one.vercel.app/api/v1/${apiName}`).then(
    (response) => response.json()
  );
};

const postData = (apiName, formData) => {
  let url = `https://travel-tracker-api-one.vercel.app/api/v1/${apiName}`
  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(
    (response) => response.json()
  );
}

export { getData, postData };
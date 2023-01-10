//apiCalls
const getData = (apiName) => {
  return fetch(`https://travel-tracker-api-one.vercel.app/api/v1/${apiName}`, {
    headers: {
      'Origin':'https://travel-tracker-api-one.vercel.app'
    }
  }).then(
    (response) => response.json()
  );
};

const postData = (apiName, formData) => {
  let url = `https://travel-tracker-api-one.vercel.app/api/v1/${apiName}`
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://travel-tracker-api-one.vercel.app'
    }
  }).then(
    (response) => response.json()
  );
}

export { getData, postData };
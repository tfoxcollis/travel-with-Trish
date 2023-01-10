//apiCalls
const getData = (apiName) => {
  return fetch(`https://travel-tracker-api-one.vercel.app/api/v1/${apiName}`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  }).then(
    (response) => response.json()
  );
};

const postData = (apiName, formData) => {
  let url = `https://travel-tracker-api-one.vercel.app/api/v1/${apiName}`
  return fetch(url, {
    method: "POST",
    mode: 'cors',

    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  }).then(
    (response) => response.json()
  );
}

export { getData, postData };
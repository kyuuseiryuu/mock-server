# Mock Server

<div style="display: flex; justify-content: start; align-contens: center;">
 <a style="margin-right: 20px" href="https://developers.cloudflare.com/workers/wrangler/commands"><img style="width:40px;height:40px;" src="https://developers.cloudflare.com/favicon-32x32.png" /></a>
 <a href="https://github.com/nuysoft/Mock"><img style="width:40px;height:40px;" src="http://mockjs.com/assets/img/logo-2.svg" /></a>

</div>

# Examples

## cURL
```bash
curl --location --request GET 'https://mock.sei.ryukyu' \
--header 'Mock-Schema-Base64: eyJyZXN1bHR8MTAiOlt7ImlkIjoiQHV1aWQoKSIsIm5hbWUiOiJAbmFtZSgpIn1dfQ=='
```

## fetch
```javascript
var myHeaders = new Headers();
myHeaders.append("Mock-Schema-Base64", "eyJyZXN1bHR8MTAiOlt7ImlkIjoiQHV1aWQoKSIsIm5hbWUiOiJAbmFtZSgpIn1dfQ==");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://mock.sei.ryukyu", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

# Deoploy for your cloudflare

- Step 1. clone this repo
- Step 2. jus run `wrangler publish`

> see more: [wrangler document](https://developers.cloudflare.com/workers/wrangler/commands/)
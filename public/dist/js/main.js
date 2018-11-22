const urlReceiverForm = document.getElementById("urlRecieverForm");
const gallery = document.getElementById("gallery");

function isInPage(node) {
  return node === document.body ? false : document.body.contains(node);
}

function changeFormApperance(event) {
  event.preventDefault();
  let submitted = urlReceiverForm.classList.contains("submitted");

  if (!submitted) {
    urlReceiverForm.classList.add("submitted");
  }
}

function renderPictures(images) {
  for (let i = 0; i < images.length; i++) {
    let thumbnailWrapper = document.createElement("div");
    thumbnailWrapper.className = "thumbnail-wrapper";

    let thumbnail = document.createElement("a");
    thumbnail.className = "thumbnail";
    thumbnail.setAttribute("style", `background-image:url("${images[i]}");`);
    thumbnail.setAttribute("href", images[i]);
    thumbnail.setAttribute("target", "_blank");

    thumbnailWrapper.appendChild(thumbnail);
    gallery.appendChild(thumbnailWrapper);
  }
}

function handleResponse(response) {
  console.log("Got response: %o", response);
  console.log("Response length: %d", response.length);
  renderPictures(response);
}

function handleResponseError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function submit(event) {
  changeFormApperance(event);

  let data = new FormData(urlReceiverForm);
  let url = data.get("url");
  let body = { url };

  fetch("/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(handleResponseError)
    .then(response => response.json())
    .then(handleResponse)
    .catch(error => console.error(error));
}

if (isInPage(urlReceiverForm)) {
  urlReceiverForm.addEventListener("submit", submit);
}

// const images = [
//   "/shit/0.jpg",
//   "/shit/1.png",
//   "/shit/2.jpg",
//   "/shit/3.jpg",
//   "/shit/4.jpg",
//   "/shit/5.jpg",
//   "/shit/6.jpg",
//   "/shit/7.jpg",
//   "/shit/8.png",
//   "/shit/9.png",
//   "/shit/10.png",
//   "/shit/11.jpg",
//   "/shit/12.jpg",
//   "/shit/13.jpg",
//   "/shit/14.jpg",
//   "/shit/15.gif"
// ];

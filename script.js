const menuToggle = () => {
  const btn = document.querySelector("#menu-btn");
  const menu = document.querySelector("#menu");

  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
};

document.querySelector("#menu-btn").addEventListener("click", menuToggle);

const apiKey = "ab5cdb0a17964f049f3a7e2260b3d3a4";
const apiUrl = "https://api.rebrandly.com/v1/links";

const fetchTinyUrl = async (longUrl) => {
  const linkRequest = {
    destination: longUrl,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify(linkRequest),
    });

    if (response.ok) {
      const responseData = await response.json();
      const shortenedUrl = responseData.shortUrl;

      appendLinkToCont(shortenedUrl, longUrl);
    } else {
      console.error(`Error creating TinyURL: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error creating TinyURL: ${error.message}`);
  }
};

const getFormData = (event) => {
  event.preventDefault();

  const linkInput = document.querySelector("#link-input");
  const longUrl = linkInput.value;

  fetchTinyUrl(longUrl);
};

const form = document.querySelector("#link-form");
form.addEventListener("submit", getFormData);

function appendLinkToCont(shortendUrl, longUrl) {
  const mainDiv = document.createElement("div");
  mainDiv.className =
    "flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row";

  const paragraph = document.createElement("p");
  paragraph.className =
    "font-bold text-center text-veryDarkViolet md:text-left";
  paragraph.textContent = longUrl;

  const innerDiv = document.createElement("div");
  innerDiv.className =
    "flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0";

  const link = document.createElement("div");
  link.className = "font-bold text-cyan";
  link.textContent = shortendUrl;

  const bgColorClass =
    document.querySelectorAll(".link-container").length % 2 === 0
      ? "bg-cyan"
      : "bg-darkViolet";

  const copyButton = document.createElement("button");
  copyButton.className = `p-2 px-8 text-white rounded-lg hover:opacity-70 focus:outline-none ${bgColorClass}`;
  copyButton.textContent = "Copy";

  innerDiv.appendChild(link);
  innerDiv.appendChild(copyButton);

  mainDiv.appendChild(paragraph);
  mainDiv.appendChild(innerDiv);
  mainDiv.classList.add("link-container");

  const container = document.querySelector(".shorten-container");
  container.appendChild(mainDiv);
}

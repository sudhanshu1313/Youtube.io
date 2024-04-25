const videoCardContainer = document.querySelector(".video-container");
let api_key = "AIzaSyAPBk7FUAwtcZihfHo-6bS6q17bmUP043M";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnails =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
  <div class="video">
        <img class="MainIMG" src="${data.snippet.thumbnails.high.url}" alt="" />
        <div class="content">
          <img class="channel-icon" src="${data.channelThumbnails}" alt=""  />
          <div class="info">
            <h6 class="title">
            ${data.snippet.title}
            </h6>
            <p class="channel-name"> ${data.snippet.channelTitle}</p>
          </div>
        </div>
      </div> 
    
  `;
};

// search bar
const searchInput = document.querySelector(".Search-bar");
const searcBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";
searcBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});

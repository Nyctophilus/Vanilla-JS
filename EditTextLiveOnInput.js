// const title = document.getElementById("title");
// const content = document.getElementById("content");

// const titleLive = document.getElementById("title-live");
// const contentLive = document.getElementById("content-live");

// title.oninput = () => {
//   titleLive.innerHTML = title.value;
// };

// content.oninput = function () {
//   contentLive.innerHTML = this.value;
// };

function editLive(element) {
  document.getElementById(`${element}`).oninput = () => {
    document.getElementById(`${element}-live`).innerHTML =
      document.getElementById(`${element}`).value;
  };
}

editLive(`title`);
editLive(`content`);

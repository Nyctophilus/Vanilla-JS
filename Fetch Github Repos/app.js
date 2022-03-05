const theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

getButton.onclick = getRepos;

function getRepos() {
  if (!theInput.value) {
    reposData.innerHTML = `<span>Please, Write a Github username</span>`;
  } else {
    fetch(
      `https://api.github.com/users/${theInput.value}/repos`
    )
      .then((response) => response.json())
      .then((data) => {
        reposData.innerHTML = ``;
        data.forEach((repo) =>
          createRepoDiv(
            repo.name,
            repo.html_url,
            repo.stargazers_count,
            repo.forks_count
          )
        );
      });
  }
}

function createRepoDiv(name, url, stars, forks) {
  const mainDiv = document.createElement("div"),
    repoName = document.createElement(`span`);
  (repoName.textContent = name),
    (repoName.style.cssText = `display: block`),
    (mainDiv.className = "repo-box");

  // url a link Git
  const theGitURL = document.createElement("a");
  (theGitURL.textContent = "Git"),
    (theGitURL.style.cssText = `display: inline-block;margin-right: 30px;color: crimson; font-weight: bold`),
    theGitURL.setAttribute("href", `${url}`),
    theGitURL.setAttribute("target", `_blank`);

  // url a link live Demo
  const liveDemo = document.createElement("a");
  (liveDemo.textContent = "live Demo!"),
    (liveDemo.style.cssText = `display: inline-block; color: #9c27b0; font-weight: bold;margin-right: 30px`),
    liveDemo.setAttribute(
      "href",
      `https://${theInput.value}.github.io/${name}/`
    ),
    liveDemo.setAttribute("target", `_blank`);

  // Stars Count
  const starCount = document.createElement("span");
  starCount.textContent = `${stars}⭐`;

  //   Forks Count
  const forkCount = document.createElement("span");
  forkCount.textContent = `${forks}🍴`;

  mainDiv.append(
    repoName,
    theGitURL,
    liveDemo,
    starCount,
    forkCount
  );
  reposData.appendChild(mainDiv);
}

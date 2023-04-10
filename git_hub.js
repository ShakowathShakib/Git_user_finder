const clientId = "b9c0726f1664e1fc43b9";
const clientSecret = "24a403992b63fe18fc94376b2581d80e5446ed4f";

async function getUser(name) {
  const response =
    await fetch(`https://api.github.com/users/${name}?Client_ID=${clientId}
&client_secret=${clientSecret}  `);

  const profile = await response.json();

  return profile;
}




document.querySelector("#search").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = document.querySelector("#findByUsername").value;

  if (userName.length > 0) {
    showLoader();

    const profile = await getUser(userName);

    document.querySelector(".loader").style.display = "none";

    if (profile.message === "Not Found") {
      document.querySelector(".notFound").style.display = "block";
     
    } else {
      const repos = await getRepos(profile);
      document.querySelector(".user-details").style.display = "flex";
      showProfile(profile);
      showrepos(repos);

    }
  }
  document.querySelector("#findByUsername").value = " ";
});

//get repos//

async function getRepos(profile) {
  const res = await fetch(`${profile.repos_url}?Client_ID=${clientId}
&client_secret=${clientSecret}&per_page=5 `);

  const repo = await res.json();

  return repo;
}
//show repo//

function showrepos(repos) {
  let newHtml = "";

  for (let repo of repos) {
    newHtml += `
<div class="repo">
       <div class="repo_name">
       <a href='${repo.html_url}'>${repo.name}</a>
       </div>
       <p>
       <span class="circle"></span> ${repo.language}
       <ion-icon name="star-outline"></ion-icon> ${repo.language}
      <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
      </div>
`;
  }
  document.querySelector(".repos").innerHTML = newHtml;
}

function showProfile(profile) {
  document.querySelector(".profile").innerHTML = `
<img
            src="${profile.avatar_url}"
            alt="${profile.name}"
          />
          <p class="name">${profile.name}</p>
          <p class="username login">${profile.login}</p>
          <p class="bio">
          ${profile.bio}
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> ${profile.followers}</span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> ${profile.following}</span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            ${profile.company}
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>${profile.location}
        </p>
`;
}
function showLoader() {
  document.querySelector(".loader").style.display = "block";

  document.querySelector(".user-details").style.display = "none";

  document.querySelector(".notFound").style.display = "none";
}

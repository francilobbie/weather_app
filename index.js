const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
const list = document.querySelector("main .cities__list");
const reset = document.querySelector("#reset__button");

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

reset.addEventListener("click", () => {
  list.innerHTML = "";
  msg.textContent = "";
  input.focus();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const listItems = list.querySelectorAll(".cities__list .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      const { main, name, sys, weather, timezone } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `<section class="weather">
      <div class="icon">
          <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      </div>
      <div class="description">
        <div class="">
          <p id="temperature">${Math.round(main.temp)}<sup>°C</sup></p>
        </div>
        <div class="">
          <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
          </h2>
        </div>
      </div>
    </section>`;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    }
  );
  msg.textContent = "";
  form.reset();
  input.focus();
})


    console.log(`Art by Blazej Kozlowski

       _
       \`*-.
        )  _\`-.
       .  : \`. .
       : _   '  \\
       ; *\` _.   \`*-._
       \`-.-'          \`-.
         ;       \`       \`.
         :.       .        \\
         . \\  .   :   .-'   .
         '  \`+.;  ;  '      :
         :  '  |    ;       ;-.
         ; '   : : \`-:     _.\`* ;
[bug] .*' /  .*' ; .*\`- +\'  \`*'
      \`*-*   \`*-*  \`*-*



      Hey! 👋 Salut à tous les curieux qui regardent dans la console !
      J'espère que vous passez une bonne journée et que vous appréciez mon site web.

      ce site est inspiré du site de George Martsoukos, vous pouvez retrouver ici 👉 https://webdesign.tutsplus.com/tutorials/build-a-simple-weather-app-with-vanilla-javascript--cms-33893

      Si vous voulez en savoir plus sur moi, vous pouvez visiter mon site ici 👉 https://franci-lobbie.fr ou consulter mon compte GitHub à l'adresse https://github.com/francilobbie.

      À bientôt ! 🙂
`);

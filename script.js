const title = document.getElementById("title");

const dateOfToday = document.getElementById("dateOfToday");
// new
const timeNow = document.getElementById("timeNow");

const fajr = document.getElementById("fajr");
const dhuhr = document.getElementById("dhuhr");
const asr = document.getElementById("asr");
const maghrib = document.getElementById("maghrib");
const isha = document.getElementById("isha");

const select_btn = document.getElementById("select-city");

const currentTime = new Date();

function updateTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const period = hours > 12 ? "PM" : "AM";
  timeNow.innerText = `${period} ${hours % 12} : ${minutes} : ${seconds}`;
}

// Update time every second
setInterval(updateTime, 1000);

function updateDate() {
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const day = currentTime.getDay();

  dateOfToday.innerText = `تاريخ اليوم ${year}:${month}:${day}`;
}
updateDate();

let citiesList = [
  { cityname: "مكة المكرمة", city: "Makkah al Mukarramah" },
  { cityname: "القصيم", city: "AlQaşīm" },
  { cityname: "جازان", city: "Jāzān" },
  { cityname: "القاهرة", city: "Cairo" },
  { cityname: "بيروت", city: "Beirut" },
  { cityname: "دبي", city: "Dubai" },
  { cityname: "اسطنبول", city: "Istanbul" },
  { cityname: "باريس", city: "Paris" },
  { cityname: "لندن", city: "London" },
  { cityname: "نيويورك", city: "New York" },
  { cityname: "طوكيو", city: "Tokyo" },
  { cityname: "بكين", city: "Beijing" },
  { cityname: "موسكو", city: "Moscow" },
  { cityname: "سيدني", city: "Sydney" },
  { cityname: "كيب تاون", city: "Cape Town" },
  { cityname: "تورنتو", city: "Toronto" },
  { cityname: "مدريد", city: "Madrid" },
  { cityname: "برلين", city: "Berlin" },
  { cityname: "روما", city: "Rome" },
  { cityname: "أثينا", city: "Athens" },
  { cityname: "شيكاغو", city: "Chicago" },
  { cityname: "مونتريال", city: "Montreal" },
  { cityname: "سان فرانسيسكو", city: "San Francisco" },
  { cityname: "مكسيكو سيتي", city: "Mexico City" },
  { cityname: "كيوتو", city: "Kyoto" },
  { cityname: "نيو دلهي", city: "New Delhi" },
  { cityname: "لشبونة", city: "Lisbon" },
  { cityname: "ستوكهولم", city: "Stockholm" },
  { cityname: "واشنطن دي. سي.", city: "Washington, D.C." },
  { cityname: "جنيف", city: "Geneva" },
  { cityname: "شنغهاي", city: "Shanghai" },
  { cityname: "هونغ كونغ", city: "Hong Kong" },
  { cityname: "سنغافورة", city: "Singapore" },
  { cityname: "سيدني", city: "Sydney" },
  { cityname: "بانكوك", city: "Bangkok" },
  { cityname: "كيبول", city: "Kabul" },
  { cityname: "نيروبي", city: "Nairobi" },
];

async function getTime() {
  try {
    let savedCity = localStorage.getItem("saved");
    if (!savedCity) {
      localStorage.setItem("saved", "Makkah al Mukarramah");
      console.log(savedCity);
    }
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByAddress?address=${savedCity}`
    );
    const json = await response.json();

    if (json.ok) {
      return;
    }

    fajr.innerText = json.data.timings.Fajr;
    dhuhr.innerText = json.data.timings.Dhuhr;
    asr.innerText = json.data.timings.Asr;
    maghrib.innerText = json.data.timings.Maghrib;
    isha.innerText = json.data.timings.Isha;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
  }
}
getTime();

function titlecheck() {
  const savedTitle = localStorage.getItem("saved");

  if (savedTitle) {
    const filteredCities = citiesList.filter((city) => {
      return city.city === savedTitle;
    });

    title.innerText = filteredCities[0].cityname;

    getTime();
  }
}

titlecheck();

// search bar
const searchBox = document.getElementById("search-input");
const list = document.getElementById("list");

searchBox.onkeyup = () => {
  if (searchBox.value && list.innerHTML.length > 0) {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
};

searchBox.addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase();
  list.innerHTML = "";

  citiesList.forEach((i) => {
    const cityName = i.cityname.toLowerCase();
    const city = i.city.toLowerCase();

    if (cityName.includes(text)) {
      list.innerHTML += `
                <li onclick="selectTheCity('${i.city}')" class="card">
                <h4>${i.cityname}</h4>
                </li>
                `;
    } else if (city.includes(text)) {
      list.innerHTML += `
      <li onclick="selectTheCity('${i.city}')" class="card">
      <h4>${i.city}</h4>
      </li>
      `;
    }
  });
});

function selectTheCity(city) {
  localStorage.setItem("saved", city);
  getTime();
  titlecheck();
  setTimeout(() => {
    list.style.display = "none";
    searchBox.value = ""
  }, 500);

  timeNow.innerHTML = `<div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        </div>`;           
}

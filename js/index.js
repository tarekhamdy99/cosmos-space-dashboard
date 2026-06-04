//^ Global Variables
const sidebar = document.getElementById("sidebar");
const sidebarToggleBtn = document.getElementById("sidebar-toggle");
const filterSideButtons = document.querySelectorAll(".nav-link");
const appSections = document.querySelectorAll(".app-section");
const today = document.querySelectorAll(".today");
const dateInput = document.getElementById("apod-date-input");
const copyRight = document.getElementById("copyright");
const apodImage = document.getElementById("apod-image");
const apodTitle = document.getElementById("apod-title");
const apodExplanation = document.getElementById("apod-explanation");
const apodMediaType = document.getElementById("apod-media-type");
const loaderSpinner = document.getElementById("apod-loading");
const openImage = document.querySelector(".openimage");
const overLay = document.querySelector(".overlay");
const launchElement = {
  status: document.getElementById("launchStatus"),
  title: document.getElementById("launchTitle"),
  provider: document.getElementById("launchProvider"),
  rocket: document.getElementById("launchRocket"),
  restDays: document.getElementById("restDays"),
  date: document.getElementById("launchDate"),
  time: document.getElementById("launchTime"),
  location: document.getElementById("locationLaunch"),
  country: document.getElementById("launchCountry"),
  description: document.getElementById("missionDescriptionLaunch"),
  img: document.getElementById("launchImg"),
};

const planetUI = {
  image: document.getElementById("planet-detail-image"),
  name: document.getElementById("planet-detail-name"),
  description: document.getElementById("planet-detail-description"),
  distance: document.getElementById("planet-distance"),
  radius: document.getElementById("planet-radius"),
  mass: document.getElementById("planet-mass"),
  density: document.getElementById("planet-density"),
  orbitalPeriod: document.getElementById("planet-orbital-period"),
  rotation: document.getElementById("planet-rotation"),
  moons: document.getElementById("planet-moons"),
  gravity: document.getElementById("planet-gravity"),
  discoverer: document.getElementById("planet-discoverer"),
  discoveryDate: document.getElementById("planet-discovery-date"),
  bodyType: document.getElementById("planet-body-type"),
  volume: document.getElementById("planet-volume"),
  perihelion: document.getElementById("planet-perihelion"),
  aphelion: document.getElementById("planet-aphelion"),
  eccentricity: document.getElementById("planet-eccentricity"),
  inclination: document.getElementById("planet-inclination"),
  axialTilt: document.getElementById("planet-axial-tilt"),
  temp: document.getElementById("planet-temp"),
  escape: document.getElementById("planet-escape"),
};

//& End The Global Variables

//^ Sidebar And Section Show Logic

//* Styles for Buttons Of Navbar
filterSideButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //? Remove Active Class From All Buttons & Make Style For Ordinary link
    filterSideButtons.forEach((btn) => {
      btn.classList.remove("bg-blue-500/10", "text-blue-400");
      btn.classList.add("text-slate-300", "hover:bg-slate-800");
    });
    //? Add Special Tailwind Classes To The Current Active Button And Make Style Like Design
    button.classList.add("bg-blue-500/10", "text-blue-400");
    button.classList.remove("text-slate-300", "hover:bg-slate-800");

    //? Get The Value OF Data Section Attribute Of Sidebar Buttons To Show Content
    let sectionValue = button.dataset.section;

    appSections.forEach((section) => {
      //? Get The Value OF Data Category Attribute Of Section
      let sectionContent = section.dataset.section;

      if (sectionValue === sectionContent) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
    //? Close Sidebar Automatically
    sidebar.classList.remove("sidebar-open");
    overLay.classList.add("hidden");
    overLay.classList.remove("block");
  });
});

//& Sidebar And Section Show Logic

//^ Helper Function
//* Update Dates Based On API And Link Between Input Value And calling API Function
function updateDatesFromAPI(apiDateString) {
  const dateObj = new Date(apiDateString);
  today.forEach((el) => {
    el.textContent = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  if (dateInput) {
    dateInput.value = apiDateString;
  }
}

//* Open Image In New Tab Function
function openImageTab() {
  //? Don't Work Until Image Downloaded
  if (!apodImage.src) {
    return;
  }
  window.open(apodImage.src, "_blank");
}
//* Turn "Window_Start" Which Comming From Server To "Launch Date" Formatting Function
function formatLaunchDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

//* Turn "Window_Start" Which Comming From Server To "Launch Time" Formatting Function
function formatLaunchTime(dateString) {
  return (
    new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }) + " UTC"
  );
}
//* The Count OF Days Between Launch Date And Current Date Function
function getDaysDifference(dateString) {
  const launchDate = new Date(dateString);
  const currentDate = new Date();

  const differenceInMs = launchDate - currentDate;

  return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
}
//* Convert The Distance To Astronomical Unit Function
function convertKmToAU(km) {
  const OneAuInKm = 149597870.7;
  if (!km || isNaN(km)) return 0;
  let au = km / OneAuInKm;
  return `${Number(au.toFixed(2))} AU`;
}
//* Show Details Of Clicked Planet Function
function showPlanetDetails(planet) {
  planetUI.image.src = planet.image || "placeholder-image.png";
  planetUI.image.alt = planet.englishName;
  planetUI.name.textContent = planet.englishName;
  planetUI.description.textContent =
    planet.description || "No description available.";
  planetUI.distance.textContent = `${planet.semimajorAxis} km`;
  planetUI.radius.textContent = `${planet.meanRadius.toLocaleString()} km`;
  planetUI.density.textContent = `${planet.density} g/cm³`;
  planetUI.gravity.textContent = `${planet.gravity} m/s²`;
  planetUI.escape.textContent = `${(planet.escape / 1000).toFixed(2)} km/s`;
  if (planet.mass) {
    planetUI.mass.textContent = `${planet.mass.massValue} × 10²⁵ kg`;
  }

  if (planet.vol) {
    planetUI.volume.textContent = `${planet.vol.volValue} × 10¹³ km³`;
  }

  if (planet.moons && planet.moons.length > 0) {
    planetUI.moons.textContent = planet.moons.length;
  } else {
    planetUI.moons.textContent = "0";
  }
  planetUI.orbitalPeriod.textContent = `${planet.sideralOrbit.toLocaleString()} Days`;
  planetUI.rotation.textContent = `${Math.abs(planet.sideralRotation)} hours ${planet.sideralRotation < 0 ? "(Retrograde)" : ""}`;

  planetUI.discoverer.textContent = planet.discoveredBy || "Ancient Times";
  planetUI.discoveryDate.textContent = planet.discoveryDate || "N/A";
  planetUI.bodyType.textContent = planet.type;

  planetUI.perihelion.textContent = `${(planet.perihelion / 1000000).toFixed(1)} Million km`;
  planetUI.aphelion.textContent = `${(planet.aphelion / 1000000).toFixed(1)} Million km`;
  planetUI.eccentricity.textContent = planet.eccentricity;
  planetUI.inclination.textContent = `${planet.inclination}°`;
  planetUI.axialTilt.textContent = `${planet.axialTilt}°`;
  const tempInCelsius = planet.avgTemp - 273.15;
  planetUI.temp.textContent = `${Math.round(tempInCelsius)}°C (${planet.avgTemp}K)`;
  planetUI.facts = [
    {
      title: "Mass:",
      value: `${planet.mass ? planet.mass.massValue + " × 10²⁵" : "N/A"} kg`,
    },
    { title: "Surface gravity:", value: `${planet.gravity} m/s²` },
    { title: "Density:", value: `${planet.density} g/cm³` },
    { title: "Axial tilt:", value: `${planet.axialTilt}°` },
  ];
  const planetFacts = document.getElementById("planet-facts");
  planetFacts.innerHTML = "";
  for (let i = 0; i < planetUI.facts.length; i++) {
    const facts = planetUI.facts;
    //?List Item
    const listItem = document.createElement("li");
    listItem.className = "flex items-start";
    //?Check Icon
    const checkIcon = document.createElement("i");
    checkIcon.className = "fas fa-check text-green-400 mt-1 mr-2";

    //?Text Content
    const textContent = document.createElement("span");
    textContent.className = "text-slate-300";
    textContent.textContent = `${facts[i].title} ${facts[i].value}`;

    listItem.append(checkIcon, textContent);

    //?Append List Item To List
    planetFacts.append(listItem);
  }
}
//* Planets Comparison Function
async function planetsComparison() {
  try {
    const comparedPlanets = await getAllPlanets();
    if (!comparedPlanets || !Array.isArray(comparedPlanets)) {
      return;
    }
    //? Get The 12 Nearest Launch
    const planetComparisonTbody = document.getElementById(
      "planet-comparison-tbody",
    );
    planetComparisonTbody.innerHTML = "";
    for (let i = 0; i < comparedPlanets.length; i++) {
      const comparedPlanet = comparedPlanets[i];
      //?Table Row
      const tableRow = document.createElement("tr");
      tableRow.className =
        comparedPlanet.englishName === "Earth"
          ? "hover:bg-slate-800/30 transition-colors bg-green-500/10"
          : "hover:bg-slate-800/30 transition-colors bg-blue-500/5";

      //?Table Cell
      const firstCell = document.createElement("td");
      firstCell.className =
        "px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10";

      //?Flex Container
      const flexContainer = document.createElement("div");
      flexContainer.className = "flex items-center space-x-2 md:space-x-3";

      //?Planet Color Circle
      const colorCircle = document.createElement("div");
      colorCircle.className =
        "w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0";
      colorCircle.style.backgroundColor = getLogoPlanetColor(
        comparedPlanet.englishName,
      );

      //?Planet Name
      const planetName = document.createElement("span");
      planetName.className =
        "font-semibold text-sm md:text-base whitespace-nowrap";
      planetName.textContent = comparedPlanet?.englishName;

      //?Append Elements To Flex Container
      flexContainer.append(colorCircle, planetName);

      //?Append Flex Container To First Cell
      firstCell.append(flexContainer);

      //?Distance Cell
      const distanceCell = document.createElement("td");
      distanceCell.className =
        "px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap";
      distanceCell.textContent = convertKmToAU(comparedPlanet.semimajorAxis);

      //?Radius Cell
      const radiusCell = document.createElement("td");
      radiusCell.className =
        "px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap";
      radiusCell.textContent = comparedPlanet.meanRadius.toLocaleString();

      //?Mass Cell
      const massCell = document.createElement("td");
      massCell.className =
        "px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap";

      const planetMass =
        comparedPlanet.mass?.massValue *
        10 ** comparedPlanet.mass?.massExponent;

      const massToEarth = planetMass / 5.97237e24;

      massCell.textContent = massToEarth.toFixed(3);
      //?Orbital Period Cell
      const orbitalPeriodCell = document.createElement("td");
      orbitalPeriodCell.className =
        "px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap";

      const orbitDays = comparedPlanet.sideralOrbit;

      if (orbitDays < 365.25) {
        orbitalPeriodCell.textContent = `${orbitDays.toFixed(0)} days`;
      } else {
        const orbitYears = orbitDays / 365.25;
        orbitalPeriodCell.textContent = `${orbitYears.toFixed(1)} years`;
      }

      //?Moons Cell
      const moonsCell = document.createElement("td");
      moonsCell.className =
        "px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap";
      if (comparedPlanet.moons && comparedPlanet.moons.length > 0) {
        moonsCell.textContent = comparedPlanet.moons.length;
      } else {
        moonsCell.textContent = "0";
      }

      //?Body Type Cell
      const bodyTypeCell = document.createElement("td");
      bodyTypeCell.className = "px-4 md:px-6 py-3 md:py-4 whitespace-nowrap";
      //?Get class based on type
      const typeClass = getPlanetTypeBadge(comparedPlanet.type);
      //?Body Type Badge
      const bodyTypeBadge = document.createElement("span");
      bodyTypeBadge.className = `${typeClass}`;
      bodyTypeBadge.textContent = comparedPlanet.type || "Unknown";

      //?Append Badge To Body Type Cell
      bodyTypeCell.append(bodyTypeBadge);

      //?Append Cells To Table Row
      tableRow.append(
        firstCell,
        distanceCell,
        radiusCell,
        massCell,
        orbitalPeriodCell,
        moonsCell,
        bodyTypeCell,
      );

      //?Append Table Row To Grid
      planetComparisonTbody.append(tableRow);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
//* Get Logo Planet Color
function getLogoPlanetColor(planetName) {
  const name = (planetName || "").trim().toLowerCase();
  if (name.includes("uranus")) return "#22d3ee";
  if (name.includes("neptune")) return "#3b82f6";
  if (name.includes("jupiter")) return "#f97316";
  if (name.includes("mars")) return "#ef4444";
  if (name.includes("mercury")) return "#a3a3a3";
  if (name.includes("saturn")) return "#facc15";
  if (name.includes("earth")) return "#10b981";
  if (name.includes("venus")) return "#e879f9";
  return "#64748b";
}
//* Get Planet Type Badge Based On The Type Of Planet
function getPlanetTypeBadge(type) {
  const t = (type || "").trim().toLowerCase();

  if (t.includes("terrestrial")) return "planet-terrestrial";
  if (t.includes("gas")) return "planet-gas-giant";
  if (t.includes("ice")) return "planet-ice-giant";

  return "planet-unknown";
}
//& End Helper Function

//^ API Connection

//* Get Today Space Date From Server Function
async function getTodaySpaceData(date = "") {
  let apiKey = "KVfDpiorlJomJlcRSWcohLKnlZfniAiOJheLVrAK";
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  if (date) {
    apiUrl += `&date=${date}`;
  }
  //? Show Loader Until Loading
  loaderSpinner.classList.remove("hidden");
  apodImage.classList.add("hidden");
  loaderSpinner.classList.add("block");
  openImage.classList.add("cursor-not-allowed");
  openImage.classList.remove("hover:bg-white/20");

  //? Show "Loading..." Until Loading
  copyRight.textContent = "Loading...";
  apodTitle.textContent = "Loading...";
  apodExplanation.textContent = "Loading...";
  apodMediaType.textContent = "Loading...";
  today.forEach((date) => (date.textContent = "Loading..."));
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    copyRight.textContent = data.copyright;
    apodImage.src = data.hdurl;
    apodImage.alt = data.title;
    //? Hide Loader And Show Image When Loading
    apodImage.onload = () => {
      loaderSpinner.classList.add("hidden");
      apodImage.classList.remove("hidden");
      apodImage.classList.add("block");
      openImage.classList.remove("cursor-not-allowed");
      openImage.classList.add("hover:bg-white/20");
    };

    //? Show Data When Loading
    apodTitle.textContent = data.title;
    apodExplanation.textContent = data.explanation;
    apodMediaType.textContent = data.media_type;
    //? Update Content Based On Value Of Date Input
    updateDatesFromAPI(data.date);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

//* Get Next Launch From Server Function
let limit = 12;
async function getNextLaunch() {
  let apiUrl = `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=${limit}`;
  try {
    //? Request To Server And Handle Response From Server
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const launchesData = data.results;
    if (!launchesData || launchesData.length === 0) {
      return null;
    }

    //? Get The Next Launch
    const launchData = launchesData[0];
    launchElement.status.textContent = launchData?.status?.abbrev || "Unknown";
    launchElement.title.textContent = launchData?.name || "Unknown";
    launchElement.provider.textContent =
      launchData?.launch_service_provider?.name || "Unknown";
    launchElement.rocket.textContent =
      launchData?.rocket.configuration?.name || "Unknown";
    launchElement.location.textContent =
      launchData?.pad.location?.name || "Unknown";
    const firstAgency = launchData?.mission?.agencies?.[0];
    launchElement.country.textContent =
      firstAgency?.country?.[0]?.name || "Unknown";
    launchElement.description.textContent =
      launchData?.mission?.description || "Unknown";
    launchElement.img.src = launchData?.image?.image_url;
    launchElement.img.onerror = () => {
      launchElement.img.src = "./assets/images/default-launch-image.png";
    };
    launchElement.img.alt = launchData?.slug || "Unknown";

    launchElement.date.textContent = formatLaunchDate(launchData?.window_start);
    launchElement.time.textContent = formatLaunchTime(launchData?.window_start);
    launchElement.restDays.textContent = getDaysDifference(
      launchData?.window_start,
    );

    return launchesData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
//* Get All Upcoming Launches From Server Function
async function getAllUpcomingLaunches() {
  try {
    const upcomingLaunches = await getNextLaunch();
    if (!upcomingLaunches || !Array.isArray(upcomingLaunches)) {
      return;
    }
    //? Get The 12 Nearest Launch
    const launchesGrid = document.getElementById("launches-grid");
    launchesGrid.innerHTML = "";
    for (let i = 0; i < upcomingLaunches.length; i++) {
      const nextLaunches = upcomingLaunches[i];
      //?Main Card
      const card = document.createElement("div");
      card.className =
        "bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer";

      //?Image Section
      const imageSection = document.createElement("div");
      imageSection.className =
        "relative h-48 bg-slate-900/50 flex items-center justify-center";

      //?Space Shuttle Image
      const shuttleImage = document.createElement("img");
      shuttleImage.className =
        "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500";
      shuttleImage.src = nextLaunches?.image?.image_url;
      shuttleImage.onerror = () => {
        shuttleImage.onerror = null;
        shuttleImage.src = "./assets/images/default-launch-image.png";
      };
      shuttleImage.alt = nextLaunches?.slug;

      //?Status Container
      const statusContainer = document.createElement("div");
      statusContainer.className = "absolute top-3 right-3";

      //?Status Badge
      const statusBadge = document.createElement("span");
      statusBadge.className =
        "px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold";
      statusBadge.textContent = nextLaunches?.status?.abbrev || "Unknown";

      //?Append Status Badge
      statusContainer.append(statusBadge);

      //?Append Image Section Elements
      imageSection.append(shuttleImage, statusContainer);

      //?Content Section
      const contentSection = document.createElement("div");
      contentSection.className = "p-5";

      //?Header Section
      const headerSection = document.createElement("div");
      headerSection.className = "mb-3";

      //?Mission Title
      const missionTitle = document.createElement("h4");
      missionTitle.className =
        "font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors";
      missionTitle.textContent = nextLaunches?.slug || "Unknown";

      //?Company Info
      const companyInfo = document.createElement("p");
      companyInfo.className = "text-sm text-slate-400 flex items-center gap-2";

      //?Company Icon
      const companyIcon = document.createElement("i");
      companyIcon.className = "fas fa-building text-xs";
      //?Company Name
      const companyName = document.createElement("span");
      companyName.textContent =
        nextLaunches?.mission?.agencies[0]?.country[0]?.name || "Unknown";

      //?Append Company Info Elements
      companyInfo.append(companyIcon, companyName);

      //?Append Header Elements
      headerSection.append(missionTitle, companyInfo);

      //?Details Section
      const detailsSection = document.createElement("div");
      detailsSection.className = "space-y-2 mb-4";

      //?Date Row
      const dateRow = document.createElement("div");
      dateRow.className = "flex items-center gap-2 text-sm";

      const dateIcon = document.createElement("i");
      dateIcon.className = "fas fa-calendar text-slate-500 w-4";

      const dateText = document.createElement("span");
      dateText.className = "text-slate-300";
      dateText.textContent = formatLaunchDate(nextLaunches?.window_start);

      dateRow.append(dateIcon, dateText);

      //?Time Row
      const timeRow = document.createElement("div");
      timeRow.className = "flex items-center gap-2 text-sm";

      const timeIcon = document.createElement("i");
      timeIcon.className = "fas fa-clock text-slate-500 w-4";

      const timeText = document.createElement("span");
      timeText.className = "text-slate-300";
      timeText.textContent = formatLaunchTime(nextLaunches?.window_start);

      timeRow.append(timeIcon, timeText);

      //?Rocket Row
      const rocketRow = document.createElement("div");
      rocketRow.className = "flex items-center gap-2 text-sm";

      const rocketIcon = document.createElement("i");
      rocketIcon.className = "fas fa-rocket text-slate-500 w-4";

      const rocketText = document.createElement("span");
      rocketText.className = "text-slate-300";
      rocketText.textContent =
        nextLaunches?.rocket?.configuration?.name || "Unknown";

      rocketRow.append(rocketIcon, rocketText);

      //?Location Row
      const locationRow = document.createElement("div");
      locationRow.className = "flex items-center gap-2 text-sm";

      const locationIcon = document.createElement("i");
      locationIcon.className = "fas fa-map-marker-alt text-slate-500 w-4";

      const locationText = document.createElement("span");
      locationText.className = "text-slate-300 line-clamp-1";
      locationText.textContent = nextLaunches?.pad?.location?.name || "Unknown";

      locationRow.append(locationIcon, locationText);

      //?Append Details Rows
      detailsSection.append(dateRow, timeRow, rocketRow, locationRow);

      //?Actions Section
      const actionsSection = document.createElement("div");
      actionsSection.className =
        "flex items-center gap-2 pt-4 border-t border-slate-700";

      //?Details Button
      const detailsButton = document.createElement("button");
      detailsButton.className =
        "flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold";
      detailsButton.textContent = "Details";

      //?Favorite Button
      const favoriteButton = document.createElement("button");
      favoriteButton.className =
        "px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors";

      //?Favorite Icon
      const favoriteIcon = document.createElement("i");
      favoriteIcon.className = "far fa-heart";

      //?Append Favorite Button Elements
      favoriteButton.append(favoriteIcon);

      //?Append Actions Elements
      actionsSection.append(detailsButton, favoriteButton);

      //?Append Content Elements
      contentSection.append(headerSection, detailsSection, actionsSection);

      //?Append Main Elements
      card.append(imageSection, contentSection);

      //?Append All Cards In Grid
      launchesGrid.append(card);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
//* Get All Planets From Server Function
async function getAllPlanets() {
  let apiUrl = `https://solar-system-opendata-proxy.vercel.app/api/planets`;
  try {
    //? Request To Server And Handle Response From Server
    const response = await fetch(apiUrl);
    const data = await response.json();
    const planetsData = data.bodies;
    showPlanetDetails(planetsData[0]);
    //? Get All Planets
    const planetsGrid = document.getElementById("planets-grid");
    planetsGrid.innerHTML = "";
    for (let i = 0; i < planetsData.length; i++) {
      const planet = planetsData[i];
      //?Planet Card
      const planetCard = document.createElement("div");

      planetCard.className =
        "planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group";
      planetCard.dataset.planetId = planet.englishName;
      planetCard.style.setProperty("--planet-color", "#3b82f6");
      planetCard.setAttribute(
        "onmouseover",
        "this.style.borderColor = '#3b82f680'",
      );
      planetCard.setAttribute(
        "onmouseout",
        "this.style.borderColor = '#334155'",
      );

      //? Click Event On Planet Card To Show Details
      planetCard.addEventListener("click", () => {
        showPlanetDetails(planet);
      });

      //?Image Container
      const imageContainer = document.createElement("div");
      imageContainer.className =
        "relative mb-3 h-24 flex items-center justify-center";

      //?Planet Image
      const planetImage = document.createElement("img");
      planetImage.className =
        "w-20 h-20 object-contain group-hover:scale-110 transition-transform";
      planetImage.src = planet.image;
      planetImage.alt = planet.englishName;

      //?Planet Name
      const planetName = document.createElement("h4");
      planetName.className = "font-semibold text-center text-sm";
      planetName.textContent = planet.englishName;

      //?Planet Distance
      const planetDistance = document.createElement("p");
      planetDistance.className = "text-xs text-slate-400 text-center";
      planetDistance.textContent = convertKmToAU(planet.semimajorAxis);

      //?Append Planet Image To Image Container
      imageContainer.append(planetImage);

      //?Append Elements To Planet Card
      planetCard.append(imageContainer, planetName, planetDistance);

      //?Append Planet Card To Grid
      planetsGrid.appendChild(planetCard);
    }
    return planetsData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
//& End API Connection

//^ Add Event Listener Logic
//* Open Tab for Image Working On Event Click
openImage.addEventListener("click", () => openImageTab());
//* Open Sidebar On Event Click on Btn Toggle Sidebar
sidebarToggleBtn.addEventListener("click", () => {
  sidebar.classList.add("sidebar-open");
  overLay.classList.remove("hidden");
  overLay.classList.add("block");
});
//* Close Sidebar On Event Click on Btn Toggle Sidebar
document.addEventListener("click", (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnToggle = sidebarToggleBtn.contains(e.target);

  if (!isClickInsideSidebar && !isClickOnToggle) {
    sidebar.classList.remove("sidebar-open");
    overLay.classList.add("hidden");
    overLay.classList.remove("block");
  }
});

//*
dateInput.addEventListener("change", (event) => {
  const selectedDate = event.target.value;
  getTodaySpaceData(selectedDate);
});

//& End Add Event Listener Logic

//^ Calling Funcion
//* Get Today Space Date Function Calling
getTodaySpaceData();
getAllUpcomingLaunches();
planetsComparison();
//& End Calling Funcion

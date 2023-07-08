//
const savedList = document.getElementById("saved-candidate");
const searchList = document.getElementById("search-candidate");
const filterList = document.getElementById("filter-candidate");

let searchValue = "searchList";

// fake data
const skill1 = ["Html", "Css", "Javascript"];
const skill2 = ["Html", "Css", "Javascript", "ReactJs"];
const skill3 = ["Html", "Css", "Javascript", "NodeJs", "Python"];
const skill4 = ["Html", "Css", "Javascript", "Python", "Django"];
const skill5 = ["Java", "SpringBoot"];
const skill6 = ["Python", "Ml"];

const role = ["frontend", "backend", "fullstack", "other"];

const data = [
  {
    id: 1,
    name: "Leanne Graham",
    qualification: "B.Tech",
    skills: skill1,
    yoe: 1,
    location: "India",
    role: role[0],
  },
  {
    id: 2,
    name: "Ervin Howell",
    qualification: "B.Tech",
    skills: skill2,
    yoe: 1,
    location: "India",
    role: role[0],
  },
  {
    id: 3,
    name: "Clementine Bauch",
    qualification: "B.C.A",
    skills: skill3,
    yoe: 2,
    location: "India",
    role: role[2],
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    qualification: "B.Tech",
    skills: skill4,
    yoe: 5,
    location: "India",
    role: role[2],
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    qualification: "B.C.A",
    skills: skill5,
    yoe: 1,
    location: "India",
    role: role[1],
  },
  {
    id: 6,
    name: "Dennis Schulist",
    qualification: "B.Tech",
    skills: skill6,
    yoe: 0,
    location: "India",
    role: role[3],
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    qualification: "B.Tech",
    skills: skill1,
    yoe: 2,
    location: "India",
    role: role[0],
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    qualification: "B.C.A",
    skills: skill2,
    yoe: 3,
    location: "India",
    role: role[0],
  },
  {
    id: 9,
    name: "Glenna Reichert",
    qualification: "B.Tech",
    skills: skill3,
    yoe: 1,
    location: "India",
    role: role[2],
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    qualification: "B.C.A",
    skills: skill6,
    yoe: 0,
    location: "India",
    role: role[3],
  },
];

//function to generate list item
function createCandidateListItem(data, doType) {
  const section = document.createElement("section");
  section.classList.add("candidate-list");

  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  const row1 = document.createElement("div");
  row1.classList.add("row1");

  const image = document.createElement("img");
  image.src = `../asset/user/user${data.id}.jpg`;
  image.alt = `${data.name}-avatar`;

  const candidateName = document.createElement("h3");
  candidateName.classList.add("candidate-name");
  candidateName.textContent = data.name;

  const saveButton = document.createElement("button");
  saveButton.textContent = doType == "save" ? "Save" : "Remove";

  saveButton.addEventListener("click", () =>
    doType == "save" ? storeData(data) : removeData(data)
  );

  const evaluateButton = document.createElement("button");
  evaluateButton.textContent = "Evaluate";

  row1.appendChild(image);
  row1.appendChild(candidateName);
  row1.appendChild(saveButton);
  row1.appendChild(evaluateButton);

  const row2 = document.createElement("div");
  row2.classList.add("row2");

  const experience = document.createElement("p");
  experience.id = "candidate-experience";
  experience.textContent = `Experience: ${data.yoe}`;

  const qualification = document.createElement("p");
  qualification.id = "candidate-qualification";
  qualification.textContent = `Qualifications: ${data.qualification}`;

  const skills = document.createElement("p");
  skills.id = "candidate-skills";
  skills.textContent = `Skills: ${data.skills}`;

  row2.appendChild(experience);
  row2.appendChild(qualification);
  row2.appendChild(skills);

  listItem.appendChild(row1);
  listItem.appendChild(row2);

  section.appendChild(listItem);

  // Append the created elements to an existing container element in the document
  const targetContainer = document.getElementById("list-generate"); // Replace 'target-container' with the ID of the desired container element
  targetContainer.appendChild(section);
}

searchList.addEventListener("click", () => {
    searchList.style.background = "rgba(108, 99, 255, 0.5)";
  savedList.style.background = "rgba(108, 99, 255, 1)";
  generateSearchList();
  searchValue = "searchList";
});

//generate candidate on page load
function generateSearchList() {
  const targetContainer = document.getElementById("list-generate");
  targetContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    createCandidateListItem(data[i], "save");
  }
}
generateSearchList();

//function to save data in local storage
function storeData(data) {
  //first check local storage
  const retrievedData = getLocalStorageData();
  const isFind = retrievedData?.find((item) => item?.id == data.id);
  if (!isFind || retrievedData == null) {
    const localData =
      retrievedData?.length > 0 ? [...retrievedData, data] : [data];
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(localData);
    // Store the data in the local storage under a specific key
    localStorage.setItem("data", jsonData);
  }
}

//regenrate list for saved items
savedList.addEventListener("click", () => {
    savedList.style.background = "rgba(108, 99, 255, 0.5)";
    searchList.style.background = "rgba(108, 99, 255, 1)";
  generateSavedList();
  searchValue = "savedList";
});

function generateSavedList() {
    const retrievedData = getLocalStorageData();

  const targetContainer = document.getElementById("list-generate");
  targetContainer.innerHTML = "";

  if (retrievedData?.length > 0) {
    retrievedData?.forEach((element) => {
      createCandidateListItem(element, "remove");
    });
  } else {
    targetContainer.innerHTML = "You have not saved any candidate information.";
  }
}

//function to remove data
function removeData(data) {
    const retrievedData = getLocalStorageData();
  const newData = retrievedData?.filter((el) => el?.id != data.id);
  // Convert the data to a JSON string
  const jsonData = JSON.stringify(newData);
  // Store the data in the local storage under a specific key
  localStorage.setItem("data", jsonData);
  generateSavedList();
}

//filter list
filterList.addEventListener("click", () => generateFilterList());
function generateFilterList() {
  const searchLocation = document.getElementById("search-location").value;
  const jobRole = document.getElementById("dropdown").value;
  if (searchValue == "searchList") {
    const newFilterData = data.filter((el) => el?.role == jobRole);
    const targetContainer = document.getElementById("list-generate");
  targetContainer.innerHTML = "";
  if (newFilterData?.length > 0) {
    newFilterData?.forEach((element) => {
      createCandidateListItem(element, "save");
    });
  } else {
    targetContainer.innerHTML = "Not any match found.";
  }
  } else if (searchValue == "savedList") {
    const retrievedData = getLocalStorageData();
    const newFilterData = retrievedData.filter((el) => el?.role == jobRole);
    const targetContainer = document.getElementById("list-generate");
    targetContainer.innerHTML = "";
    if (newFilterData?.length > 0) {
      newFilterData?.forEach((element) => {
        createCandidateListItem(element, "remove");
      });
    } else {
      targetContainer.innerHTML = "Not any match found.";
    }
  }
}

//function to get data from local storage
function getLocalStorageData(){
    // Retrieve the data from local storage
    const storedData = localStorage.getItem("data");
    // Convert the JSON string back to an object
    const retrievedData = JSON.parse(storedData);
    // Use the retrieved data
    return retrievedData;
}

// Clear the entire local storage
//localStorage.clear();

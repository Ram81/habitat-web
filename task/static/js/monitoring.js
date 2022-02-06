var jsonData = []; 
var instructionRecordMap = {};
var numberPerPage = 4;
var numberOfPages = 0;
var currentPage = 1;
var pageList = new Array();
var allHitMeta = {};


function loadJSON(callback, path) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    //xobj.setRequestHeader('Access-Control-Allow-Origin', '*');

    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && (xobj.status === 200 || xobj.status === 0)) {
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

function getNumberOfPages() {
    var selectedInstruction = document.getElementById("instructionList").value;
    var selectedScene = document.getElementById("sceneList").value;
    return Math.ceil(instructionRecordMap[selectedScene][selectedInstruction].length / numberPerPage);
}

function convertToInstructionMap(records) {
    var instructionMap = {};
    var instructionSelect = document.getElementById("instructionList");
    var sceneSelect = document.getElementById("sceneList");
    for (let record in records) {
        var instruction = records[record]["task"];
        console.log(records[record]);
        var sceneId = records[record]["sceneId"].split("/");
        sceneId = sceneId[sceneId.length - 1];
        if (!instructionMap.hasOwnProperty(sceneId)) {
            instructionMap[sceneId] = {}
        }
        if (!instructionMap[sceneId].hasOwnProperty(instruction)) {
            instructionMap[sceneId][instruction] = [];
        }
        instructionMap[sceneId][instruction].push(records[record]);
    }
    var sortedKeys = Object.keys(instructionMap).sort();
    var count = 0;
    let uniqueInstructions = new Set();
    for (let idx in sortedKeys) {
        var sceneId = sortedKeys[idx];
        
        var optionElement = document.createElement("option");
        optionElement.value = sceneId;
        optionElement.innerHTML = sceneId;
        sceneSelect.appendChild(optionElement);

        var sortedInstructionKeys = Object.keys(instructionMap[sceneId]).sort();
        for (let instIdx in sortedInstructionKeys) {
            var instruction = sortedInstructionKeys[instIdx];
            uniqueInstructions.add(instruction);
            // var optionElement = document.createElement("option");
            // optionElement.value = instruction;
            // optionElement.innerHTML = instruction;
            // instructionSelect.appendChild(optionElement);
            count+=1;
        }
    }
    let instructionArray = Array.from(uniqueInstructions).sort();
    for (let instIdx in instructionArray) {
        var instruction = instructionArray[instIdx];
        var optionElement = document.createElement("option");
        optionElement.value = instruction;
        optionElement.innerHTML = instruction;
        instructionSelect.appendChild(optionElement);
    }
    console.log("Total instructions: " + count + ", UNique: "+ instructionArray.length);
    return instructionMap;
}

function updateInstructionList() {
    var instructionSelect = document.getElementById("instructionList");
    instructionSelect.innerHTML = '';
    var sceneId = document.getElementById("sceneList").value;
    let uniqueInstructions = new Set();

    var sortedInstructionKeys = Object.keys(instructionRecordMap[sceneId]).sort();
    for (let instIdx in sortedInstructionKeys) {
        var instruction = sortedInstructionKeys[instIdx];
        uniqueInstructions.add(instruction);
    }
    let instructionArray = Array.from(uniqueInstructions).sort();
    for (let instIdx in instructionArray) {
        var instruction = instructionArray[instIdx];
        var optionElement = document.createElement("option");
        optionElement.value = instruction;
        optionElement.innerHTML = instruction;
        instructionSelect.appendChild(optionElement);
    }
}

function populateScenes() {
    var instructionSelect = document.getElementById("sceneList");
    var scenes = ["scene_1.glb", "scene_1.glb", "scene_2.glb", "scene_3.glb", "scene_4.glb", "scene_5.glb"];
    for (let idx in scenes) {
        let scene_id = scenes[idx];
        var optionElement = document.createElement("option");
        optionElement.value = scene_id;
        optionElement.innerHTML = scene_id;

        instructionSelect.appendChild(optionElement);
    }
}

function updateStats() {
    var totalHits = document.getElementById("totalHits");
    totalHits.innerHTML = "Total HITs: " + allHitMeta["total_assignments"];
    var submittedHits = document.getElementById("sceneAssignments")
    submittedHits.innerHTML = "Completed HITs: " + (allHitMeta["approved_assignments"] + allHitMeta["submitted_assignments"]);
}

function loadDataset(records) {
    var count = Object.keys(records).length;
    numberOfPages = getNumberOfPages();

    console.log('Total training examples ' + count);
    console.log('Number of pages: ' + numberOfPages);
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

function getVideoPath(img) {
    var path = img.split("_").slice(0, -1).join("_");
    return "data/hit_data/video/" + path + "/" + img;
}

function drawList() {
    var visited = 0;
    var authToken = getParameterByName("authToken");
    for (var r = 0; r < pageList.length; r++) {
        var videoPath = getVideoPath(pageList[r]["video"]);
        var video = document.getElementById("video"+ (r + 1));
        video.getElementsByTagName("source")[0].src =  videoPath;
        video.load();
        document.getElementById("text"+ (r + 1)).innerHTML =  "<b>Task</b>: " + pageList[r]["task"];
        document.getElementById("uuid"+ (r + 1)).innerHTML =  "<b>Assignment Id</b>: " + pageList[r]["episodeId"];
        document.getElementById("eplen"+ (r + 1)).innerHTML =  "<b>Episode Length</b>: " + pageList[r]["episodeLength"];
        document.getElementById("message"+ (r + 1)).innerHTML = "";
        document.getElementById("video"+ (r + 1)).style.display = "";
        document.getElementById("text"+ (r + 1)).style.display =  "";
        document.getElementById("uuid"+ (r + 1)).style.display =  "";
        document.getElementById("eplen"+ (r + 1)).style.display =  "";
        if (authToken != null && authToken.length > 0) {
            document.getElementById("approve"+ (r + 1)).style.display =  "";
            document.getElementById("reject"+ (r + 1)).style.display =  "";
        } else {
            document.getElementById("approve"+ (r + 1)).style.display =  "none";
            document.getElementById("reject"+ (r + 1)).style.display =  "none";
        }
        document.getElementById("message"+ (r + 1)).style.display =  "";
        document.getElementById("feedback"+ (r + 1)).style.display =  "";

        // Check if HIT is already approved
        isAlreadyApproved(r);
        visited += 1;
    }
    if (visited < numberPerPage) {
        for (var r = visited; r < numberPerPage; r++) {
            document.getElementById("video"+ (r + 1)).style.display = "none";
            document.getElementById("text"+ (r + 1)).style.display =  "none";
            document.getElementById("uuid"+ (r + 1)).style.display =  "none";
            document.getElementById("eplen"+ (r + 1)).style.display =  "none";
            document.getElementById("approve"+ (r + 1)).style.display =  "none";
            document.getElementById("reject"+ (r + 1)).style.display =  "none";
            document.getElementById("message"+ (r + 1)).style.display =  "none";
            document.getElementById("feedback"+ (r + 1)).style.display =  "none";
        }
    }
}

function getHits() {
    var authToken = getParameterByName("authToken");
    var mode = getParameterByName("mode");

    // if (authToken === undefined || authToken === null) {
    //     return;
    // }

    if (mode == null) {
        mode = "live";
    }
    
    var url = window.location.href;
    var splitteUrl = url.split("/");
    var hostUrl = splitteUrl[0] + "//" + splitteUrl[2];
    var selectedScene = document.getElementById("sceneList").value;
    if (selectedScene == undefined || selectedScene == null || selectedScene.length == 0) {
        return;
    }

    // Build request
    var requestUrl = hostUrl + "/api/v0/get_hits_assignment_submitted_count";
    let request = new XMLHttpRequest();
    request.open("POST", requestUrl)
    request.send(JSON.stringify({
        "authToken": authToken,
        "mode": mode,
        "sceneId": selectedScene
    }));
    request.onload = () => {
        console.log(request.status);
        if (request.status == 200) {
            var response = JSON.parse(request.response);
            allHitMeta = response["all_hit_meta"];
            updateStats();
            console.log("success!");
        } else if (request.status == 203) {
            console.log("HIT Unapproved!");
        } else if (request.status == 208) {
            console.log("HIT Rejected!");
        } else if (request.status == 205) {
            console.log("HIT Approve failed!");
        }
    }
}

function approveHit(id, isApproved) {
    console.log("Approve HIT: " + JSON.stringify(pageList[id]));
    var uniqueId = pageList[id]["episodeId"]
    var authToken = getParameterByName("authToken");
    var mode = getParameterByName("mode");

    if (authToken === undefined || authToken === null) {
        document.getElementById("message" + (id + 1)).innerHTML = "Invalid auth token!";
        return;
    }

    if (mode == null) {
        mode = "debug";
    }
    
    var url = window.location.href;
    var splitteUrl = url.split("/");
    var hostUrl = splitteUrl[0] + "//" + splitteUrl[2];

    // Build request
    var requestUrl = hostUrl + "/api/v0/approve_hit";
    let request = new XMLHttpRequest();
    request.open("POST", requestUrl)
    request.send(JSON.stringify({
        "authToken": authToken,
        "uniqueId": uniqueId,
        "mode": mode,
        "isApproved": isApproved
    }));
    request.onload = () => {
        if (request.status == 200) {
            console.log("success!");
            if (isApproved) {
                document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:green;font-weight:400;\">Approved!</span>";
            } else {
                document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:red;font-weight:400;\">Rejected!</span>";
            }
        } else if (request.status == 203) {
            document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:blue;font-weight:400;\">Already approved!</span>";
        } else if (request.status == 401) {
            document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:red;font-weight:400;\">Unauthorized approve request!</span>";
        } else {
            console.log("approve failed!");
            document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:red;font-weight:400;\">Approve failed!!</span>";
        }
    }
}

function isAlreadyApproved(id) {
    var uniqueId = pageList[id]["episodeId"]
    var authToken = getParameterByName("authToken");
    var mode = getParameterByName("mode");

    // if (authToken === undefined || authToken === null) {
    //     document.getElementById("message" + (id + 1)).innerHTML = "";
    //     return;
    // }

    if (mode == null) {
        mode = "live";
    }
    
    var url = window.location.href;
    var splitteUrl = url.split("/");
    var hostUrl = splitteUrl[0] + "//" + splitteUrl[2];

    // Build request
    var requestUrl = hostUrl + "/api/v0/is_approved";
    let request = new XMLHttpRequest();
    request.open("POST", requestUrl)
    request.send(JSON.stringify({
        "uniqueId": uniqueId,
        "mode": mode
    }));
    request.onload = () => {
        if (request.status == 200) {
            var response = JSON.parse(request.response);
            console.log("success!");
            if (response["message"] == "HIT already approved!") {
                document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:green;font-weight:400;\">Approved!</span>";
            } else if (response["message"] == "Not already approved") {
                document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:Orange;font-weight:400;\">Not Approved!</span>";
            } else {
                document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:Orange;font-weight:400;\">" + response["message"] + "</span>";
            }
            document.getElementById("feedback" + (id + 1)).innerHTML = "<b>Feedback:</b> " + response["question_data"];
        } else if (request.status == 203) {
            console.log("HIT Unapproved!");
            document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:Orange;font-weight:400;\">Not Approved!</span>";
        } else if (request.status == 208) {
            console.log("HIT Rejected!");
            document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:red;font-weight:400;\">Rejected!</span>";
        } else if (request.status == 205) {
            console.log("HIT Approve failed!");
            document.getElementById("message" + (id + 1)).innerHTML = "<b>Status:</b> <span style=\"color:blue;font-weight:400;\">Multiple exists!</span>";
        } else {
            document.getElementById("message" + (id + 1)).innerHTML = "Invalid auth token. HIT status GET failed!";
        }
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    var selectedInstruction = document.getElementById("instructionList").value;
    var selectedScene = document.getElementById("sceneList").value;
    if (instructionRecordMap[selectedScene].hasOwnProperty(selectedInstruction)) {
        var selectedRecords = instructionRecordMap[selectedScene][selectedInstruction];
        numberOfPages = getNumberOfPages();

        pageList = selectedRecords.slice(begin, end);
        document.getElementById("pageNum").innerHTML = "Page: " + currentPage + " / " + numberOfPages + ", HITs per Page: " + numberPerPage;
        drawList();
        check();
        document.getElementById("message0").innerHTML = "";
    } else {
        document.getElementById("message0").innerHTML = "No tasks for scene:" + selectedScene +", instruction: " + selectedInstruction + " pair!";
    }
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}


function load() {
    // populateScenes();
    loadJSON(function(data) {
        jsonData = JSON.parse(data);
        instructionRecordMap = convertToInstructionMap(jsonData);
        updateInstructionList();
        loadDataset(jsonData);
        loadList();
    }, "data/hit_data/instructions.json");
    getHits();
}

window.onload = load;
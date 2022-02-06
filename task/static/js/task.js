/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
window.psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

//var mycondition = condition;  // these two variables are passed by the psiturk server process
//var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in this code code yet but may become useful

var taskTitleMap = {
  "flythrough": "Environment flythrough",
  "training": "Training task",
  "viewer": "ObjectGoal Navigation Experiment",
  //"instructions/instruct-general.html": "Object Rearrangement Experiment",
  "instructions/instruct-general.html": "ObjectGoal Navigation Experiment",
  "instructions/instruct-flythrough.html": "Environment flythrough",
  "instructions/instruct-training.html": "Training task",
  "instructions/instruct-task.html": "Final task",
  "instructions/replay.html": "Task demo",
};

var steps = [
  "instructions/instruct-general.html",
  "instructions/instruct-flythrough.html",
  "instructions/replay.html",
  "instructions/instruct-training.html",
  "training",
  "instructions/instruct-task.html",
  "viewer"
];

var stepActionMap = {
  "instructions/instruct-general.html": "navigation/start.html",
  "instructions/instruct-flythrough.html": "navigation/skip.html",
  "instructions/instruct-training.html": "navigation/skip.html",
  "instructions/instruct-task.html": "navigation/middle.html",
  "training": "navigation/next.html",
  "viewer": "navigation/end.html",
  "instructions/replay.html": "navigation/middle.html"
};

// All pages to be loaded
var pages = [
  "instructions/instruct-general.html",
  "instructions/instruct-flythrough.html",
  "instructions/instruct-training.html",
  "instructions/instruct-task.html",
  "instructions/replay.html",
  "navigation/start.html",
  "navigation/end.html",
  "navigation/middle.html",
  "navigation/skip.html",
  "navigation/next.html",
  "viewer.html",
  "postquestionnaire.html"
];

psiTurk.preloadPages(pages);


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and
* insert them into the document.
*
********************/

/*********************
* HABITAT TEST       *
*********************/
var HabitatExperiment = function() {

  var startTime = new Date().getTime();

  psiTurk.recordTrialData({'type':"platformInfo",'navigator':window.navigator});

  // Load the viewer.html snippet into the body of the page
  psiTurk.showPage('viewer.html');
  psiTurk.recordTrialData({'type':"loadViewer",'phase':'TEST'});

  const SimInitialized = function() {
    return !!(window.demo &&
              window.demo.task &&
              window.demo.task.initialized);
  };


  const getParameterByName = function(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  const getSkipFlythroughTrainingFlag = function() {
    var url = window.location.href;
    var splitteUrl = url.split("/");
    var hostUrl = splitteUrl[0] + "//" + splitteUrl[2];

    // Build request
    var requestUrl = hostUrl + "/api/v0/worker_flythrough_training_skip";
    let request = new XMLHttpRequest();
    request.open("POST", requestUrl)
    request.send(JSON.stringify({
        "workerId": getParameterByName("workerId"),
        "mode": getParameterByName("mode")
    }));
    request.onload = () => {
        if (request.status == 200) {
            _self.skipTrainingResponse = JSON.parse(request.response);
            return request.response;
        } else {
          return {};
        }
    }
  };

  getSkipFlythroughTrainingFlag();

  // Start the test
  _self = this;
  _self.iStep = 0;
  _self.flythroughComplete = false;
  _self.trainingComplete = false;
  _self.flythroughEndTime = null;
  _self.trainingEndTime = null;

  const runStep = function() {
    const showViewer = function(isFlythrough) {
      $("#instructions").hide();
      $("#task-instruction").show();
      $("#container").show();
      $("#text-assistance-1").show();
      $('#actions-nav-instructions').hide();
      $('#actions-nav-instructions').html("");
      if (isFlythrough) {
        $('#actions-nav').hide();
      } else {
        $('#actions-nav').show();
      }
      if(SimInitialized()) {
        window.demo.task.bindKeys();
      }
    };

    const showInstructions = function(isFlythrough) {
      $("#instructions").show();
      $("#container").hide();
      if (isFlythrough) {
        setFlythroughTaskInstruction();
        $("#text-assistance-1").show();
        $("#task-instruction").show();
        $('#actions-nav-instructions').html("");
        $('#actions-nav-instructions').hide();
        $('#actions-nav').html(psiTurk.getPage(stepActionMap[step]));
        $('#actions-nav').show();
      } else {
        $("#task-instruction").html("");
        $("#text-assistance-1").hide();
        $('#actions-nav').hide();
        $('#actions-nav').html("");
        $("#actions-nav-instructions").html(psiTurk.getPage(stepActionMap[step]))
        $('#actions-nav-instructions').show();
      }
      if(SimInitialized()) {
        window.demo.task.unbindKeys();
      }
    };

    const setTaskTitle = function(task) {
      $("#task-title").html("<h1>" + taskTitleMap[task] + "</h1>");
    }

    const setFlythroughTaskInstruction = function() {
      let objectIconTags = {};
      if (window.demo.task_type == "cleaning") {
        $("#task-instruction").html("<hr> <h4>Task: Pick up everything scattered on the floor and put them at their right locations (e.g. shoes in the shoerack, etc.). Note that the appropriate locations might not be the ones nearest to the object.</h4> <hr>");  
        objectIconTags["objects"] = [
          "<div><img src='/data/test_assets/objects/spatula.png' style='border: 3px solid grey'/><div class='img-caption'>Spatula</div></div>"
          + "<div><img src='/data/test_assets/objects/Dixie_10_ounce_Bowls_35_ct.png' style='border: 3px solid grey'/><div class='img-caption'>Dixie bowl</div></div>"
          + "<div><img src='/data/test_assets/objects/toy_airplane.png' style='border: 3px solid grey'/><div class='img-caption'>Toy airplane</div></div>"
          + "<div><img src='/data/test_assets/objects/e_lego_duplo.png' style='border: 3px solid grey'/><div class='img-caption'>Blue lego</div></div>" ];

        $("#text-assistance-1").html(
          "<div class='object-type'> Object: </div> <ul>" +
          objectIconTags["objects"].join("\n") +
          "</ul>" +
          "<br/>"
        );
      } else if (window.demo.task_type == "objectnav") {
        $("#task-instruction").html("<hr> <h4>Task: Find cabinet.</h4> <hr>");  
        objectIconTags["objects"] = [];
        objectIconTags["receptacles"] = [];
        $("#text-assistance-1").html("");
      } else {
        $("#task-instruction").html("<hr> <h1>Task: Place the cheezit box on the red plate</h1> <hr>");
        objectIconTags["objects"] = ["<div><img src='/data/test_assets/objects/cracker_box.png' style='border: 3px solid grey'/><div class='img-caption'>Cheezit box</div></div>"];
        objectIconTags["receptacles"] = ["<div><img src='/data/test_assets/objects/plate.png' style='border: 3px solid grey'/><div class='img-caption'>Red plate</div></div>"];
      
        $("#text-assistance-1").html(
          "<div class='object-type'> Object: </div> <ul>" +
          objectIconTags["objects"].join("\n") +
          "</ul>" +
          "<br/><div class='object-type'> Receptacle: </div> <ul>" +
          objectIconTags["receptacles"].join("\n") +
          "</ul>"
        );
      }
    }

    let step = steps[_self.iStep];
    console.log("iStep:", _self.iStep, "step:", step);
    window.step = step;
    psiTurk.recordTrialData({'type':"runStep",'phase':'TEST','iStep':_self.iStep,'step':step});

    setTaskTitle(step);
    if(step === "flythrough") {
      _self.flythroughComplete = true;
      showViewer(true);
      const waitForFlythrough = function() {
        if(SimInitialized()) {
          window.demo.runFlythrough();
        } else {
          console.log("Sim not initialized yet. Waiting");
          window.setTimeout(waitForFlythrough, 1000);
        }
      };
      waitForFlythrough();
    } else if (step === "training") {
      _self.trainingComplete = true;
      showViewer(false);
      $("#actions-nav").html(psiTurk.getPage(stepActionMap[step]))
      // $('#actions-nav-instructions').show();
      // $('#actions-nav-instructions').html(psiTurk.getPage(stepActionMap[step]));
      window.demo.runTrainingTask();
    } else if(step === "viewer") {
      // Initialize experiment episode
      showViewer(false);
      $("#actions-nav").html(psiTurk.getPage(stepActionMap[step]));
      // $('#actions-nav-instructions').show();
      // $('#actions-nav-instructions').html(psiTurk.getPage(stepActionMap[step]));
      window.demo.runInit();
    } else {
      $("#instructions").html(psiTurk.getPage(step))
      let isFlythrough = step.includes("replay");
      if (isFlythrough) {
        _self.flythroughComplete = true;
      }
      showInstructions(isFlythrough);
      const waitForStartEnable = function() {
        if(SimInitialized()) {
          document.getElementById("next").disabled = false;
        } else {
          document.getElementById("next").disabled = true;
          console.log("Sim not initialized yet. Start disabled");
          window.setTimeout(waitForStartEnable, 1000);
        }
      };
      waitForStartEnable();
	  }

    $("#next").unbind('click').bind('click', function(e) {
      e.preventDefault();
      if (steps[_self.iStep] == "viewer") {
        document.getElementById("hit-complete-message").innerHTML = "<h4>Validating....</h4>";
        setTimeout(function() {
          if (window.demo.task.validateTask()) {
            window.finishTrial();
          } else {
            if (window.demo.task_type == "cleaning") {
              document.getElementById("hit-complete-message").innerHTML = "<h4>Objects have not been placed on the receptacles</h4>";  
            } else if (window.demo.task_type == "objectnav") {
              document.getElementById("hit-complete-message").innerHTML = "<h4>You are not within 1m of the object</h4>";
            } else {
              document.getElementById("hit-complete-message").innerHTML = "<h4>The object has not been placed on the receptacle</h4>";
            }
          }
        }, 3000);
      } else {
        window.finishTrial();
      }
    });

    $("#skip").unbind('click').bind('click', function(e) {
      e.preventDefault();
      ++_self.iStep;
      window.finishTrial();
    });

    $("#prev").unbind('click').bind('click', function(e) {
      e.preventDefault();
      if(_self.iStep - 1 >= 0) {
        --_self.iStep;
        runStep();
      }
    });
  }

  window.finishTrial = function(doReset = true) {
      psiTurk.recordTrialData({'type':"finishStep", 'phase':'TEST'});
      // Record end time of each step
      if (steps[_self.iStep] == "instructions/replay.html") {
        _self.flythroughEndTime = new Date().toISOString();
      } else if (steps[_self.iStep] == "training") {
        _self.trainingEndTime = new Date().toISOString();
      }

      ++_self.iStep;

      if (_self.skipTrainingResponse["flythrough_complete"] == true) {
        if (steps[_self.iStep] == "instructions/instruct-flythrough.html") {
          window.finishTrial();
        }
        if (steps[_self.iStep] == "instructions/replay.html") {
          window.finishTrial();
        }
      }

      if (_self.skipTrainingResponse["training_task_complete"] == true) {
        if (steps[_self.iStep] == "instructions/instruct-training.html") {
          window.finishTrial();
        }
        if (steps[_self.iStep] == "training") {
          window.finishTrial();
        }
      }

      if(_self.iStep < steps.length) {
        if(doReset && SimInitialized()) {
          window.demo.task.reset();
        }

        runStep();
      } else {
        if(SimInitialized())
          window.demo.task.unbindKeys();

        window.currentview = new Questionnaire(_self.flythroughComplete, _self.trainingComplete,
           _self.flythroughEndTime, _self.trainingEndTime);
      }
  };
  runStep();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function(flythroughComplete, trainingComplete, flythroughEndTime, trainingEndTime) {

  var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

  const check_responses = function() {
    let responsesFilled = true;
    $('textarea').each( function(i, val) {
      if(this.value === "")
        responsesFilled = false;
    });
    $('select').each( function(i, val) {
      if(this.value === "")
        responsesFilled = false;
    });
    let radioNames = new Set();
    let checkedRadioNames = new Set();
    $('input').each( function(i, val) {
      const name = (this.id && this.id !== "")?this.id:this.name;
      if(val.type === "radio") {
        radioNames.add(name);
        // Only record checked radio buttons
        if(!val.checked)
          return;
        else {
          checkedRadioNames.add(name);
        }
      }
      if(this.value === "")
        responsesFilled = false;

      psiTurk.recordUnstructuredData(name, this.value);
    });
    return responsesFilled;

  };
  const record_responses = function() {

    psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

    $('textarea').each( function(i, val) {
      psiTurk.recordUnstructuredData(this.id, this.value);
    });
  };

  prompt_resubmit = function() {
    document.body.innerHTML = error_message;
    $("#resubmit").click(resubmit);
  };

  resubmit = function() {
    document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
    reprompt = setTimeout(prompt_resubmit, 10000);

    record_hit_data();
    psiTurk.saveData({
      success: function() {
          clearInterval(reprompt);
          psiTurk.completeHIT(); // when finished saving compute bonus, the quit
      },
      error: prompt_resubmit
    });
  };

  getParameterByName = function(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  record_hit_data = function() {
    var url = window.location.href;
    var splitteUrl = url.split("/");
    var hostUrl = splitteUrl[0] + "//" + splitteUrl[2];

    // Build request
    var requestUrl = hostUrl + "/api/v0/worker_hit_complete";
    let request = new XMLHttpRequest();
    request.open("POST", requestUrl)
    request.send(JSON.stringify({
        "hitId": getParameterByName("hitId"),
        "assignmentId": getParameterByName("assignmentId"),
        "workerId": getParameterByName("workerId"),
        "flythroughComplete": flythroughComplete,
        "trainingTaskComplete": trainingComplete,
        "taskComplete": true,
        "trainingEndTime": trainingEndTime,
        "flythroughEndTime": flythroughEndTime
    }));
    request.onload = () => {
        if (request.status == 200) {
            console.log("success!");
        }
    }
  };

  // Load the questionnaire snippet
  psiTurk.showPage('postquestionnaire.html');
  psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

  $("#next").click(function () {
    document.getElementById("submitting-info").innerHTML = "<div><h5> Please do not close the browser tab</h5> <br/> <h5>Redirecting.....</h5></div>"
    record_responses();
    record_hit_data();
    psiTurk.saveData({
          success: function(){
              psiTurk.completeHIT(); // when finished saving compute bonus, the quit
          },
          error: prompt_resubmit});
    });
};

// Task object to keep track of the current phase
window.currentView = undefined;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
   window.currentView = new HabitatExperiment(); ;

    /*psiTurk.doInstructions(
      instructionPages, // a list of pages you want to display in sequence
      function() { window.currentView = new HabitatExperiment(); } // what you want to do when you are done with instructions
    );*/
});

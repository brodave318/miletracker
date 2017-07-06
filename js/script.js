$(document).one('pageinit', function() {
  // display runs
  showRuns();

  // Add handler
  $('#submitAdd').on('tap', addRun);

  /*
   * Show all runs on homepage
   */
  function showRuns() {
    // get runs objects
    var runs = getRunsObject();

    // Check if empty
    if(runs != '' && runs != null) {
      for(var i = 0;i < runs.length; i++) {
        $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>' + runs[i]['date'] + '<br><strong>Distance: </strong>' + runs[i]['miles'] + ' miles<div class="controls">' + '<a href="#edit">Edit</a> | <a href="#">Delete</a></li>');
      }
      $('#home').bind('pageinit', function() {
        $('#stats').listview('refresh');
      });
    }
  }

  /*
   * Add a run
   */
  function addRun() {
    // Get form values
    var miles = $('#addMiles').val();
    var date = $('#addDate').val();

    // Create 'run' object
    var run = {
      date: date,
      miles: parseFloat(miles)
    };

    var runs = getRunsObject();

    // Add run to runs array
    runs.push(run);

    alert('Run Added');

    // Set stringified object to localStorage
    localStorage.setItem('runs', JSON.stringify(runs));

    // Redirect to index page
    window.location.href="index.html";

    return false;
  }

    /*
     * Get runs object
     */
    function getRunsObject() {
      // Set runs array
      var runs = new Array();
      // Get current runs from localStorage
      var currentRuns = localStorage.getItem('runs');

      // Check localStorage
      if(currentRuns != null) {
        // Set to runs
        var runs = JSON.parse(currentRuns);
      }

      // Return runs object
      return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
  }
});

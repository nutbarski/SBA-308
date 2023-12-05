// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
//data collection
function getLearnerData(course,ag,submissions){ //save course for future reference
    const assignments = {};
    for (const assignment of ag.assignments){
        assignments[assignment.id] = {
            points_possible: assignment.points_possible,
            due_at: assignment.due_at
        };
    }

    //extract the data and place into variables
    const learners = {};
    for (const submission of submissions) {

        const learnerID     = submission.learner_id;
        const assignmentID  = submission.assignment_id;
        
        const score             = submission.submission.score;
        const pointsPossible    = assignments[assignmentID].points_possible;
        
        const dueDate           = assignments[assignmentID].due_at;
        const submissionDate    = submission.submission.submitted_at;

        if (!learners[learnerID]){
                learners[learnerID] = {
                    totalScore: 0,
                    totalWeight: 0,
                    scores: {}
                };
        }
        //compare dates directly
        if (submissionDate <= dueDate) {
            learners[learnerID].totalScore  += score;
            learners[learnerID].totalWeight += pointsPossible;
            learners[learnerID].scores[assignmentID] = (score / pointsPossible);
        }
    }

    //crunch the numbers and place into formatting

    const result = [];
    for (const learnerID in learners) {

        const learner       = learners[learnerID];
        const weightedAvg   = (learner.totalScore / learner.totalWeight);

        const formattedScores = {};
        for (const assignmentID in learner.scores) {
            formattedScores[assignmentID] = learner.scores[assignmentID];
        }

        result.push({
            id: learnerID,
            avg: weightedAvg.toFixed(3),
            ...formattedScores
        });

    }

    return result;

}
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
  
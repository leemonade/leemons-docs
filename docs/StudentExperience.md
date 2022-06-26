---
sidebar_position: 7
---

import { Button, ThemeProvider, Stack } from "@bubbles-ui/components";
import ReactPlayer from 'react-player'

# Student experience

Tools adapted to the context of use, with a clean and self-explanatory interface. You will never waste time figuring out how your teaching tool works. The essential is always one click away.

# Activities and assignments

Activities are at the heart of instructional design at Leemons. For now, Leemons supports two basic types of activities: tasks and tests (with images or mapping).

When an activity is assign to a classroom, custom group or individual, this activity becomes on an assignment, allowing teachers to define the type of evaluation, deadlines, etc…

So far, Leemons support four types of evaluation in the assignment configuration:

- Gradable (the score will be taken into account for the final grade, comments are allowed).
- Non-gradable with score (a score is required but will not be taken into account for the final grade, comments are allowed).
- Only feedback (only comments are given back)
- Not evaluable (no score or feedback is given)

## Create and assign Tasks

Tasks in Leemons can range from a review task of reading a text or watching a video without any kind of evaluation, to the elaboration of a final master's thesis that requires the submission of attached files.

Task also have a new brand functionality calls “multi-subject tasks”, with this new feature you could create tasks related with more than one subject and attach to them specific curriculum from each subject, the best part?, Leemons allow subjects’s teachers to evaluate this tasks separately and given different scores related to each subject.

<ThemeProvider>
    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
</ThemeProvider>
How to create a task or “multi-subject task” on Leemons Platform

## Tests overview

The Leemons test system is based on the creation of question banks that can then be reused to create specific tests.
At the moment we support single-answer questions with or without images and a special type of test that we call map test.

### Question banks (QBanks)

Question banks allow the creation of small databases of questions on a specific topic or area of knowledge that can then be used in tests.

<ThemeProvider>
    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
</ThemeProvider>
How to create Question Banks

### Create and assign test

Once the question banks have been created, setting up and assigning a test is extremely simple.

<ThemeProvider>
    <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
</ThemeProvider>
How to create and assign tests

#
# OnGoing activities and evaluation process

The "Ongoing Activities" section allows the teacher to manage the assignments in progress and to consult in real time the pace of the submissions

## Main OnGoing

On the main ongoing activities page, you can review all the assignments that have been made and are still open.

![Main OnGoing page **(REVISAR PARA TRADUCIR)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/67ec841b-b586-4e58-aa28-a41f6ee02a65/Untitled.png)

Main OnGoing page **(REVISAR PARA TRADUCIR)**

## Detail OnGoing

On the detail page of the activities in progress, we will see the detail of a specific assignment, with the students that were included. If the activity requires scoring or feedback, the system allows direct access to the evaluation page.

![OnGoing Detail with “Evaluate” actions **(REVISAR TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/41879d08-ddd9-4edf-8263-d5e24bc9b84b/Untitled.png)

OnGoing Detail with “Evaluate” actions **(REVISAR TRADUCCIÓN)**

### Close assignment

If the activity has no due date or if late submission (after the due date) is allowed, the teacher can close the activity at any time and students will no longer be able to do the activity or make submissions. 

The teacher can decide to re-open the activity whenever he/she wants and the students will be able to complete it again.

![Close Activity switch **(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6b99f142-4724-4807-afce-50675051fc44/Untitled.png)

Close Activity switch **(REVISAR PANTALLA Y TRADUCCIÓN)**

### Archive assignment

Once an activity has reached its due date or has been closed by the teacher, then the activities can be archived. Archived activities will no longer be visible in the list of current activities for the teacher or the students, and will be moved to the historical record.

![Archive option **(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5c3f5696-a535-4b64-8897-af89880ca21d/Untitled.png)

Archive option **(REVISAR PANTALLA Y TRADUCCIÓN)**

## Evaluation pages

When a student has completed an assignment (with or without deliverable), the teacher can evaluate it by including a score (which will be gradable or not depending on the assignment settings) and can also include a comment or feedback.

### Scoring

This feature allows you to put a numerical or letter-based score on completed activities or student deliverables.

![Scoring feature in the evaluation page  **(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70c02524-61bf-424d-989f-0e65e01ed7db/Untitled.png)

Scoring feature in the evaluation page  **(REVISAR PANTALLA Y TRADUCCIÓN)**

### Feedback

Thanks to the feedback module, the teacher can include comments and advice for the student.

![**(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3bbeb2a-5485-4e2c-b6d1-ef288d7d082e/Untitled.png)

**(REVISAR PANTALLA Y TRADUCCIÓN)**

# Calendar and Kanban support to teaching

Calendar and Kanban help teachers manage communication related to activity assignments.

The system automatically creates events in the calendar and tasks in Kanban, allowing both to keep track of when an activity is due and to monitor its progress through Kanban statuses.

For example, a new assigned activity will appear in the student's Kanban in his "To Do" column, if he opens it and starts to do it, this card will go to "In Progress", once delivered (and if it needs teacher review) it will go to "To Review" and once evaluated, it will automatically go to "Done" (at which time the student can archive it if he wishes).

![Automatic calendar event, created when assigning an activity. **(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5f9bbb1e-b895-448b-a6f6-f41ce3fea587/Untitled.png)

Automatic calendar event, created when assigning an activity. **(REVISAR PANTALLA Y TRADUCCIÓN)**

![Automatic Kanban task, created by assigning an activity **(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9668f1d2-42a4-47b7-a967-52f068fd63de/Untitled.png)

Automatic Kanban task, created by assigning an activity **(REVISAR PANTALLA Y TRADUCCIÓN)**

# Scores

Our scoring and grading system currently supports the creation of custom evaluation periods by the administrator (such as semesters or quarters), so that teachers can consult lists of scores and students in a personalized way, or using these periods provided by the organization.

From Scores, you can consult the average grades obtained for a given period, change scores in real time (only for assignments, since tests have automatic scores), and you can also consult those scores that are not gradable in order to better visualize the student's learning progress.

![Scores page with evaluation periods and the list of activities and students.  **(REVISAR PANTALLA Y TRADUCCIÓN)**](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/30c004b4-ef24-4b00-b41e-58d090220af1/Untitled.png)

Scores page with evaluation periods and the list of activities and students.  **(REVISAR PANTALLA Y TRADUCCIÓN)**


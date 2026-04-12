# Description
This app is to generate a Fifa Ultimate Team inspired card to give each user the ability get and show off there own skills and compare it to their favourite player. This score will be determined be performing football drills per skill (i.e shooting, passing etc) and generate a score.

# Visuals
- The app should have clear and sleek visuals
- It should look similar to the nike training club app and gymshark training app.

# Functional Requirements
- Should have a log in page where the log in details are defined within code
- Should give the user the ability to input scores on drills they perform per skill. Skills include:
    - Shooting
    - Passing
    - Dribbling
    - Strength
    - Defending
    - Speed
- For each skill, there should be 5 drills with placeholders for embedded videos. It should give the ability to input a score for each drill.
- Should give users for each score a button to move onto the next or save progress
- On the home screen it should give them their last score

# User Flow
- Users should log in then be presented with a screen to select the skill they want to test
- Each skill should have a set of 5 videos which are a training video, which has a description of how to score then an option to input a score
- When the scores are all inputted, they should be submitted and it should call the API to generate the average score
- The app should then save the score and use it to generate a skill score for each skill
- Once all skills are saved, a button to generate a football card, showing all the skills and then generate an overall skill - this should be in the format of a fifa player card in the game.



# Backend API
- Should be built within the application with a future to have it running on its own separate app.

# Application Code Flow
- Each score submission should call an API that generates the average score of the skill


# Build
- Use the deploy.yml a template pipeline
- Use which runtime to build - preferably Node.
- This will be built using github actions and deployed on an Azure app service

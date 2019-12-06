# Homework 6 - Weather Dashboard

The aim of this assignment was to create a weather dashboard, using APIs and AJAX calls (from openweathermap), that will output current weather, as well as a 5 day forecast when a city is searched. It should also list recent searches on a sidebar, with the option to click and re-run those searches.

## Composition of Website and Code

Whenever I could, I used jQuery to code the javascript. I created some basic HTML framework, a CSS file, and a javascript file. I used a combination of some built in HTML and dynamically generated HTML.

## Process

I first tackled the API calls, making sure I could produce current weather, forecasted weather, and UV conditions with 3 different API URLS, with a default (Evanston) location. Then I researched how to add icons denoting the weather conditions. Stackoverflow was helpful for this as I learned that the icon information was included in the response object output, and were hosted URL images.

I did some pseudo coding to break down the steps for creating the calls and outputing the data, appending searches, and for the onclick events.

During and after completing the assignment, I commented out each step of my javascript code, so that when I come back to it, I could understand exactly what I did and why. 

## Deployment

Aftering completing requirements for the assignment, I did a final update of the files in Github and deployed the website for review. 

https://github.com/jenjch/weatherDashboard

https://jenjch.github.io/weatherDashboard

## Acceptance Criteria

The weather dashboard successfully produces current and forecasted weather conditions upon search, and allows users to click on buttons created from past searches to produce those buttons again. Icons of the associated weather conditions are also successfully rendered. Feedback on best practices, and improvements I should make are helpful.

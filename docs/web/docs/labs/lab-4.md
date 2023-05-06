# Lab 4 - Hexed! Game

**Due Date: 2/24**

## Overview

The Hexed! game is a simple game where your goal is to guess the correct randomly generated color as quickly as possible. The game consists of several UI elements, each of which should be its own React component.

## Objectives

1. Implement game setup, allowing the player to input their name and the length of the game in seconds.
2. Randomly select and display a target color when the game starts.
3. Implement a countdown timer that ends the game if it reaches 0.
4. Provide three slider bars for the player to guess the color.
5. Calculate the score based on the given formula.
6. Create the required React components for the UI elements.

## Guidelines

- During game setup, the player should input their name and the length of the game in seconds (between 1 and 100, inclusive).
- If the user does not input a name, do not start the game until they have.
- If the user did not choose a number of seconds, make the number of seconds 60.
- The game should be served via localhost, not on your VMs.

## UI Elements (React Components)

- A target color UI element
- A slider bar element
- A countdown timer element
- A name entry and game seconds element
- A button element to submit their guess

## Grading

| Criteria                | Points |
|-------------------------|--------|
| Functionality           | 25     |
| Style                   | 5      |
| Creativity              | 5      |
| README.md               | 5      |
| **Total**               | 40     |



```
((255 - abs(actual_red - guessed_red)) + (255 - abs(actual_green - guessed_green)) + (255 - abs(actual_blue - gussed_blue))) * floor(seconds_remaining) * (1000 * (101 - seconds_selected))

```
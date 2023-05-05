# Hexed! game
**Due 2/24**

The Hexed! game is a simple game where your goal is to guess the correct randomly generated color as quickly as possible.

During game setup, the player should be able to input their name and the length of the game in seconds, which is a number between 1 and 100, inclusive. If the user does not input a name, do not start the game until they have. If the user did not choose a number of seconds, make the number of seconds 60.

When the player clicks the “Start” button, a color should be randomly selected in the color space #000000 - #FFFFFF. That color should be displayed to the user. The timer should also begin to count down from the selected number of seconds. If the timer reaches 0 before the player guesses a color, the game is over.

The game should present three slider bars: one for the color red, one for green, and one for blue. The value range for each slider bar should be #00 - #FF, inclusive.

The score is calculated using the following formula:

```
((255 - abs(actual_red - guessed_red)) + (255 - abs(actual_green - guessed_green)) + (255 - abs(actual_blue - gussed_blue))) * floor(seconds_remaining) * (1000 * (101 - seconds_selected))

```

Note: I know this isn’t a good formula. It’s a formula that uses all the different components of the game.

The page should have a number of UI elements, each of which should be its own React component:
- A target color UI element
- A slider bar element
- A countdown timer element
- A name entry and game seconds element
- A button element to submit their guess

You are working on this together as a group. This only needs to be served via localhost, not on your VMs.

**Grading**
- Functionality: 25 pts.
- Style: 5 pts.
- Creativity: 5 pts.
- README.md: 5 pts.
- Total: 40 pts.

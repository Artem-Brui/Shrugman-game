# Shrugman-game


Welcome to the Shrugman-game! This README file will guide you through the setup, functionality, and rules of the game.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Game Rules](#game-rules)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Introduction

This project is a simple command-line game where players can engage in a guessing game. The game includes functionalities for managing user data, generating new game rounds, and displaying game status.

## Features

- **User Management**: Add new users, check existing users, and manage user game data.
- **Game Mechanics**: Start new game rounds, choose game categories, and guess letters to reveal hidden titles.
- **Dynamic Feedback**: Provide feedback and instructions through the console with visual and textual prompts.
- **Data Persistence**: Save and update user and game data using JSON files.

## Game Rules

1. **Starting the Game**:
   - When a user starts the game, they will be prompted to enter their name.
   - If the user is new, they will be given the option to start a new game or continue with an existing game.
   - For existing users, they can choose to continue their previous game or start a new one.

2. **Choosing a Category**:
   - The user selects a category from a predefined list.
   - Based on the selected category, a game title is chosen randomly, ensuring it has not been played before by the user.

3. **Gameplay**:
   - The game is similar to Hangman where the user guesses letters to reveal a hidden game title.
   - The user has a limited number of incorrect guesses before the game ends.

4. **Winning and Losing**:
   - The game ends when the user either correctly guesses the title or exhausts their allowed number of incorrect guesses.
   - The game has a base where save data about user's games history and its results.
   - The game status is updated to `win` or `lose` based on the outcome. This status updates base data and save it.

## Setup Instructions

1. **Clone the Repository**:  
  Ensure you have Node.js installed. Then, install the required packages using npm:
  ```
  git clone git@github.com:Artem-Brui/Shrugman-game.git
  cd Shrugman-game
  ```
2. **Install Dependencies**:  
  Ensure you have Node.js installed. Then, install the required packages using npm:
  ```
  npm install
  ```
3. **Content Files**:  
   1. **File speaking-base.json** Stores Messages for interaction with a gamer.
   2. **File titles-base.json** Stores Title for game separated by categories.
   3. **File pictures-base.json** Stores ASCII pictures for interaction with a gamer.
   4. **File gamers-base.json** Stores Gamers data like: NAME, ID, GAMES-LIST with Game Title, Game Category, Result Of Game, Date Of Game.

4. **Scripts Files**:  
   1. **File direct-functions.js** Stores the main part of actions that need during game.
   2. **File classes.js** Stores classes for creating new gamer and new game for the storage.
   3. **File game-round.js** Stores implementation of game round steps.
   4. **File base-working.js** Stores a script for interaction with gamers base.


## Usage

1. **Start the Game**:
   - Run the game script.
    ```
    node main.js
    ```
   - Follow the prompts to enter your name and select a game category.

2. **Game Interaction**:
   - Guess letters to reveal the game title.
   - You will receive feedback and instructions throughout the game.

---
waltz:
  title: Educational Game Design Document Template
meta:
  version: 0.0.2
  gdd authors:
    - Joel Hafycz and Ryan Melillo
  template authors:
    - Austin Cory Bart <acbart@udel.edu>
    - Mark Sheriff
    - Alec Markarian
    - Benjamin Stanley
---

# Game Name 
Function Robot

## Elevator Pitch

As someone who had no experience with Computer Science before college, I was obviously intimidated by computer programming. Any time I would see someone working on a program, I would see the console and immediately realize I had no clue what was going on, let alone simple functions, loops, etc. Going into college, these concepts were difficult for me to grasp right away, so I understand the struggles of new Computer Scientists. Our game’s goal is to teach simple concepts of computer programming, to take away the intimidation factor that comes with novice programming.


## Influences (Brief)

- *Influence #1*:
  - This Is The Only Level (game)
     While thinking through game ideas, I was drawn to a similar game, This Is The Only Level, which is a platforming game which you work through puzzles. I thought, an interesting way to present the information would be working through puzzles in a way similar to that game, which I played a lot of in grade school

- *Influence #2*:
  - IDEs
      As of now, we hope to design the game to at least have the background of an IDE, or something similar to that.

- *Influence #3*:
  - LightBot (game)
      This game essentially teaches functional decomposition in reverse. The game limits the amount of commands that you can give to the robot(with the goal of having him reach the light bulb). Some levels are impossible to complete if you do not combine commands into groups and use these groups multiple times(for loops).


## Core Gameplay Mechanics (Brief)

Platforming, to reach areas to complete puzzles
  Use arrows keys(or WASD) to navigate and spacebar to jump

Puzzles, which allow you to reach extra areas and the end of levels
   Tasks emulating the theme of coding ideas such as for loops 
   - a bin of colored soccer balls, put all the soccer balls in the net
   - robot pushes boxes that represent the elements in an array, to the end, dodging workers and spikes

Power-ups that only last through one level or one world(series of levels), to illustrate variable scope


# Learning Aspects

## Learning Domains

Introductory Computer Science game that focuses on Cognitive learning


## Target Audiences

Introductory Computer Science students
Children on videogame websites, like CoolMathGames

## Target Contexts

For children and teenagers to gain interest in Computer Science and become interested in it

## Learning Objectives

By the end of the game, players will be able to predict the behavior of
  - Assigning a value to a variable
  - A for loop
  - A while loop
  - (Not complete)


## Prerequisite Knowledge

Participants should have knowledge of fundamental math concepts
  - Addition
  - Subtraction
  - etc.

Participants would have a much easier time with basic programming knowledge, however it is not necessary

## Assessment Measures

Pre game, we will assess the user’s knowledge of concepts with a quiz or simple project

Post game, we will assess the user’s learnings with a similar quiz or project

# What sets this project apart?

This game presents a visual representation of programming logic that is underutilized or poorly executed upon when trying to introduce coding concepts to new learners. The player engages in a fun game to later have the game mechanics equated to programming components, which generally results in better retention.

Not many games growing up involve any sort of programming, or major logic puzzles, so children are introduced to these concepts at an earlier age, and can become interested in the field

Students in early computer labs class tend to play games on coolmathgames.com, or adventuregames.com etc, and could come into contact with this game instead


# Player Interaction Patterns and Modes

## Player Interaction Pattern

A singular player (as of now unless we can add multiplayer somehow) will traverse through levels with platforming and puzzles

Puzzles include
  - Creating an array, pushing boxes, that represent values in the array, into place to "form" an array while avoiding enemies and spikes
  - Moving the same vales in the array, and changing them (adding +1 or -1) to show how the function would take each part of the array one at a time and add one
  - etc.


## Player Modes

Player mode: Playthrough mode, where the player is able to play through the game like normal, completing puzzles and platforming

# Gameplay Objectives

- *Primary Objective #1*:
    - Description: Beating the game, by getting past the puzzles and platforming
        Alignment: These puzzles will introduce the concepts of coding components such as for loops, and demonstrate how they work

- *Primary Objective #2*:
    - Description: Finding extra power ups, or point pickups to increase your score
        Alignment: Scope of variables 

# Procedures/Actions
Players interact with their character with the arrow keys

Left → left movement
Right → right movement
Up → jump action
Down → possible crouch action?
Space → pickup boxes

R → possible shoot ability if we add one


# Rules

Players will have a certain amount of lives (to be determined)
Players will have a certain amount of time (to be determined, probably with difficulty levels)
These rules will make it so there is some challenge implemented into the game


# Objects/Entities

- Player
- Walls (verticle surface)
- Platforms (horizontal surface)
- Spikes (kills player on hit)
- Workers (enemies, kills player on hit)
- Boxes (can open doors, and be fitted into place)
- Doors


## Core Gameplay Mechanics (Detailed)

Core Gameplay Mechanics: As of now, the main concepts of the puzzles are that they are based on for loops with increasing complexity. The player will have to complete a combination of platforming and a mildly repetitive task, such as retrieving numerous objects from the same location. The platforming may increase in difficulty after the first 1 and 2 retrievals. From here, the player will have the option to somehow record their movement as a power-up, and then have that movement be repeated however often they like. This will serve as a function, demonstrating both the concept of a for loop, as well as the concept of scope, as the power-up(function) will be unusable in the next level(or the next world).


    
## Feedback

*Explicitly describe what visual/audio/animation indicators there are that give players feedback on their progress towards their gameplay objectives (and ideally the learning objectives).*

*Describe what longer-term feedback you detect and give that guides the player in their learning and lets them know how they are doing in regards to the learning objectives.*

# Story and Gameplay

## Presentation of Rules

Players will be given short text instructions on what to do, while the rest will be taught through level design.


## Presentation of Content

Our game won’t teach someone how to program, rather it is meant to strengthen one’s knowledge of major concepts such as scope, loops, etc. We will be showing these concepts through our puzzles.

## Story (Brief)

You are in an IDE, as a robot, and you complete puzzles to run programs while avoiding spikes and enemies (workers)

## Storyboarding

The game starts with a title screen of code being written
You press on the start button and a level select screen comes up, all levels being locked except for the first one
You click on the first level and start it
You are a robot completing the functions displayed in each level.
You move boxes, avoid enemies, ect, to emulate the action of completing a function

# Assets Needed

## Aethestics

The map should look like a factory, with machines and crates and such around. Metal walls, floors, background. There will be workers around too (enemies). The music will be in a style similar to metroid.

## Graphical

- Characters List
  - Player one (robot)
  - Workers (enemies)
- Textures:
  - Spike Texture
  - Worker Texture
  - Door Texture
  - Coin Texture
- Environment Art/Textures:
  - Background Texture
  - Wall Texture
  - Platform Texture


## Audio  (Have not worked on yet)


*Game region/phase/time are ways of designating a particularly important place in the game.*

- Music List (Ambient sound)
  - *Game region/phase/time*: *Example 1*, *Example 2*
  - *Game region/phase/time*: *Example 3*, *Example 4*
  
*Game Interactions are things that trigger SFX, like character movement, hitting a spiky enemy, collecting a coin.*

- Sound List (SFX)
  - *Game Interaction*: *Example 1*, *Example 2*
  - *Game Interaction*: *Example 3*, *Example 4*


# Metadata

* Template created by Austin Cory Bart <acbart@udel.edu>, Mark Sheriff, Alec Markarian, and Benjamin Stanley.
* Version 0.0.3
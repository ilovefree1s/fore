# FORE deck

Card text for the app. `build.js` parses this file, so this is the only
place card wording lives.

Rules of the file:

- A `# ` heading starts a pile. The pile is `format` if the heading
  contains the word "Format", `keeps` if it contains "Keep".
- A `## ` heading starts a card. The heading is the card title.
- `points: N` (format cards only, required) is what the hole is worth.
- `count: N` (optional, default 1) is how many copies go in the pile.
- Everything else under the heading is the card body. Blank lines split
  paragraphs.

PLACEHOLDER TEXT. Real wording comes after the skeleton is proven.

# Format cards

## Scramble
points: 2

Everyone tees off. Pick the best ball, everyone plays from there. Repeat
until holed.

## Alternate Shot
points: 2

Pair up. Partners alternate shots with one ball, including the tee shot.

## One Club
points: 3

Pick one club before you tee off. That is the only club you may use on
this hole. Putter included.

## Wolf
points: 3

The player with honors is the Wolf. After each tee shot the Wolf may
claim that player as a partner, or go lone wolf against the field.

## Worst Ball
points: 3

Everyone hits two balls from every spot and must play the worse of the
two. Yes, on the green too.

# Keeps cards

## Mulligan
count: 2

Replay one shot, no penalty. Hand this card over when you use it.

## Foot Wedge
count: 2

Move your ball up to one club length, anywhere except onto the green.

## Tee Up

Tee up your ball anywhere, fairway or rough. Not in a hazard.

## Re-Do

Make another player replay their last shot. Putts included.

## Gimme

Pick up a putt inside the length of a putter grip and call it holed.

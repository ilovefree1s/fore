# FORE deck

Card text for the app. `build.js` parses this file, so this is the only
place card wording lives.

Rules of the file:

- A `# ` heading starts a pile. The pile is `format` if the heading
  contains "Fore-Mat" or "Format", `keeps` if it contains "Keep" or "Power".
- A `## ` heading starts a card. The heading is the card title.
- `points: N` (Fore-Mat cards only, required) is what the hole is worth.
  Short text like `1-2` is fine when it varies.
- `format: text` (Fore-Mat cards, optional) is the team shape, like `2v2`.
- `count: N` (optional, default 1) is how many copies go in the pile.
- Everything else under the heading is the card body. Blank lines split
  paragraphs. A line ending in a colon (like `Restrictions:`) followed by
  `- ` bullets becomes a labeled list on the card.

# Fore-Mat cards

Fore-Mat cards set the game format for the entire hole. 18 unique, 20 total.

## Four Ball
format: 2v2
points: 1

The card player chooses a partner. All four players play their own ball
for the entire hole.

Scoring:
- Compare the lowest score from each team. Lower score earns 1 point.
- If the low scores tie, compare the higher score from each team. Lower
  score earns the point.
- If both are tied, no point.

## Scramble
count: 2
format: 2v2
points: 1

The card player chooses a partner. Each team plays one team score.

Rules:
- Both teammates hit.
- The team chooses the preferred shot and both players hit from there.
- Continue until the hole is completed.

Scoring:
- Lowest team score earns 1 point. A tie awards no point.

## Worst Ball Scramble
format: 2v2
points: 1

The card player chooses a partner. Each team plays one team score.

Rules:
- Both teammates hit each shot.
- The opposing team chooses which of the two shots you must play from.
  They will usually pick the worse one.
- Continue until the hole is completed.

Scoring:
- Lowest team score earns 1 point. A tie awards no point.

## Reversal
format: 1v1v1v1
points: 1

Every player plays their own ball, with the bag turned upside down.

Required Clubs:
- Tee shot: wedge.
- Second shot: 6, 7, 8, or 9 iron.
- Third shot: 3, 4, or 5 iron.
- Finish the hole with a wood or driver.

Scoring:
- Lowest score earns 1 point.

## Bingo-Bango-Bongo
format: 1v1v1v1
points: 3

Every player plays their own ball. The player furthest from the hole
always hits first. Three separate points are available.

Bingo:
- 1 point to the first player to reach the green.

Bango:
- Once everyone is on the green, 1 point to the player closest to the pin.

Bongo:
- 1 point to the first player to make a putt.

## Pick 3!
format: 1v1v1v1
points: 1

Every player plays their own ball. Before the hole begins, each player
chooses exactly 3 clubs.

Rules:
- Those are the only 3 clubs that player may use for the entire hole.

Scoring:
- Lowest score earns 1 point.

## Alternate Shot
format: 2v2
points: 1

The card player chooses a partner. Each team uses only one ball.

Rules:
- Teammates alternate hitting shots.
- Each player plays from wherever their teammate's shot finished.
- Keep alternating until the ball is holed.

Scoring:
- Lowest team score earns 1 point. A tie awards no point.

## Wild Card, Bitches!
format: Player's choice
points: 1-2

The card player chooses any Fore-Mat in the deck and decides whether the
hole is worth 1 point or 2 points.

Pick From:
- Scramble
- Shamble
- Alternate Shot
- Four Ball
- Hi/Lo
- Bingo-Bango-Bongo
- Worst Ball Scramble
- Wolf
- One Club
- Pick 3
- Tin Cup
- Reversal
- Box Pick
- Random Partner
- Double Match
- Wait Fore It
- Heavy Is The Head

## Box Pick
format: 1v1v1v1
points: 1

Every player plays their own ball, and every player tees off from a
different tee box.

Tee Selection Order:
- Last place chooses their tee box first.
- Then third place, then second place.
- First place gets what is left, usually the tips.
- If standings are tied, flip a tee or coin.

Scoring:
- Lowest score earns 1 point.

## Hi/Lo
format: 2v2
points: 2

The card player chooses a partner. Every player plays their own ball.
Two separate points are available.

Low:
- Compare the lower score from each team. Lower score earns 1 point.

High:
- Compare the higher score from each team. Lower score earns 1 point.

Ties:
- A tied comparison awards no point.

## Shamble
count: 2
format: 2v2
points: 1

The card player chooses a partner. Each team records two individual
scores.

Rules:
- Both teammates hit a tee shot and the team picks the better one.
- Both players move to that spot.
- From there, each player plays their own ball to the hole.

Scoring:
- Add both teammates' scores together.
- Lowest combined score earns 1 point. A tie awards no point.

## Tin Cup
format: 1v1v1v1
points: 1

Every player plays their own ball.

Rules:
- Every player must use a 7 iron for the entire hole. Putts included.

Scoring:
- Lowest score earns 1 point.

## One Club
format: 1v1v1v1
points: 1

Every player plays their own ball. The card player chooses one club, and
every player must use that same club for the hole.

Rules:
- The chosen club must be used for every shot that is not a putt.
- Players may still use their putter on the green.

Scoring:
- Lowest score earns 1 point.

## Wait Fore It
format: 2v2
points: 1

Everyone hits their tee shot before the card player chooses a partner.

Rules:
- After seeing all four tee shots, the card player picks their partner.
- The other two players become the opposing team.

Scoring:
- Each team records one team score. Lowest team score earns 1 point.

## Random Partner
format: 2v2
points: 1

The card player gets a randomly selected partner. The other two players
form the opposing team.

Scoring:
- Each team records one team score. Lowest team score earns 1 point.

## Double Match
format: Two 1v1 matches
points: 2

Two separate head-to-head matches are played on this hole.

Matches:
- Match 1: first place vs. second place.
- Match 2: third place vs. fourth place.
- If a tie between second and third makes the matchups unclear, flip a
  tee or coin.

Scoring:
- Lowest score in each match earns 1 point. 2 points total.

## Heavy Is The Head
format: 1v3
points: 1

The player currently in first place plays alone against the other three
as a team. Play the hole as a best-ball match.

Rules:
- If multiple players are tied for first, flip a tee or coin to decide
  who plays alone.
- Cannot be played on hole 1. If drawn there, draw another Fore-Mat card.

Scoring:
- Every player on the winning side earns 1 point.

## Wolf!
format: 1v3 or 2v2
points: 1-3

The card player is the Wolf. Everyone hits their tee shot, then the Wolf
decides whether to choose a partner or go it alone.

Lone Wolf:
- The Wolf plays alone against the other three.
- Wolf beats or ties the best of the other three: Wolf earns 3 points.
- Wolf loses: each of the other three earns 1 point.

Choose a Partner:
- The Wolf picks one partner. The other two form the opposing team.
- The team with the lowest combined score earns 1 point.

# Power Up cards

One-time-use cards that give a player an advantage or let them interfere
with another player. 27 unique, 30 total.

## Attack Throw!

Throw an opponent's ball in any direction using your non-dominant hand.

Restrictions:
- Cannot be used if the opponent's ball is on the green.

## Dominant Arm Throw!

Advance your ball by throwing it with your dominant arm.

Restrictions:
- Cannot be used once the ball is on the green.

Scramble/Shamble Rule:
- Does not count as a stroke.
- You must use the card from your own ball.
- After the throw, both partners may play from the resulting location.

## Texas Wedge!

Give this card to any player who is within 50 yards of the green.

That player must use their putter for their next shot.

## Fore-Tune Teller!

Roll your ball toward the hole before putting to get a read on the green.

## Step Back!

Give this card to another player.

Choose any direction and make that player take 10 steps from their current
lie. Their ball is moved to that new location.

Restrictions:
- Cannot be used if the ball is on the green.

## Repeat!

Give this card to another player immediately after they hit a shot.

They must use the exact same club for their next shot.

Restrictions:
- Cannot be used after a made putt.

## Guard Rail!

Lay the flagstick flat on the green and use it as a guide rail or backstop
for any shot or putt.

## Step Up!

Line your ball up directly toward the flagstick and take 10 steps forward.

Restrictions:
- Cannot be used if the ball is already on the green.
- If your 10 steps would take you onto the green, stop at the edge of the
  green and place the ball there.

## No Putter!

Give this card to another player.

That player is not allowed to use a putter for the entire hole. They may
still putt, but must use another club.

## Drive Swap!

Swap your tee shot with the tee shot of any other player.

Restrictions:
- Your ball must still be in play.
- Your tee shot must have traveled at least 100 yards from the tee box.

## Movin' On Back!

Give this card to another player.

That player must tee off from the back tees for the hole.

## Movin' On Up!

Move up to the next closest tee box for the hole.

## Mulligan!
count: 4

Take a free do-over of any shot.

If the second shot is worse than the first one, that's your problem.

## No Practice Swings!

Give this card to another player.

That player is not allowed to take any practice swings for the entire hole.

Penalty:
- Any type of practice swing results in a 1-point penalty.

## Foot Wedge!

Advance your ball by kicking it with your foot.

Restrictions:
- Cannot be used once the ball is on the green.

Scramble/Shamble Rule:
- Does not count as a stroke.
- You must use the card from your own ball.
- After the kick, both partners may play from the resulting location.

## Obstacle!

Place a tee or divot repair tool on the green between an opponent's ball
and the hole.

Restrictions:
- The obstacle must be at least 1 foot away from the opponent's ball.
- The obstacle must be at least 1 foot away from the hole.

## Putt Pass!

Hit a putt, then hit the ball one additional time while it is still moving.

Partner Rule:
- If playing with a partner, you may instead pass the moving ball to your
  partner and let them hit it.

## Re-Do!

Give this card to another player immediately after they hit a shot.

They must replay the shot. Basically a reverse Mulligan.

## Tee Up!

Tee your ball up from anywhere for your next shot.

## Cut The Putt!

Cut the distance of any putt in half.

Move the ball halfway closer to the hole before putting.

## Free Drop!

Take a free drop from a hazard or out-of-bounds area.

## Auto Fairway!

Move your tee shot to the closest point on the fairway.

## Lip Out!

If your putt catches any part of the hole but does not go in, play this
card and the putt counts as made.

## I'll Have What He's Having!

If your drive is bad, move your ball to the location of another player's
good drive.

## Air Horn!

Distract another player during their swing.

## Bowl Putt!

Roll the ball underhand toward the hole.

Restrictions:
- Must be used from the green or fringe.

Scoring:
- The roll does not count as a stroke.

## Non-Dominant Arm Throw!

Advance your ball by throwing it with your non-dominant arm.

Restrictions:
- Cannot be used once the ball is on the green.

Scramble/Shamble Rule:
- Does not count as a stroke.
- You must use the card from your own ball.
- After the throw, both partners may play from the resulting location.

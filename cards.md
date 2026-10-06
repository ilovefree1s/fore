# FORE deck

Card text for the app. `build.js` parses this file, so this is the only
place card wording lives.

Rules of the file:

- A `# ` heading starts a pile. The pile is `format` if the heading
  contains the word "Format", `keeps` if it contains "Keep" or "Power".
- A `## ` heading starts a card. The heading is the card title.
- `points: N` (format cards only, required) is what the hole is worth.
- `count: N` (optional, default 1) is how many copies go in the pile.
- Everything else under the heading is the card body. Blank lines split
  paragraphs. A line ending in a colon (like `Restrictions:`) followed by
  `- ` bullets becomes a labeled list on the card.

# Format cards

PLACEHOLDER TEXT until the real format cards arrive.

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

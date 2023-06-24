const { CardGame } = require("../controllers/CardDungeon");

describe("CardGame", () => {
  it("should initialize game state correctly", () => {
    const playersPile = [
      {
        id: 1,
        pile: [
          { suit: "♥ hearts ♥", rank: "2" },
          { suit: "♥ hearts ♥", rank: "7" },
          { suit: "♦ diamonds ♦", rank: "2" },
          { suit: "♦ diamonds ♦", rank: "Jack" },
          { suit: "♦ diamonds ♦", rank: "9" },
        ],
      },
      {
        id: 2,
        pile: [
          { suit: "♠ spades ♠", rank: "3" },
          { suit: "♠ spades ♠", rank: "Queen" },
          { suit: "♠ spades ♠", rank: "2" },
          { suit: "♠ spades ♠", rank: "Ace" },
          { suit: "♣ clubs ♣", rank: "8" },
        ],
      },
    ];
    const drawPile = [{ rank: "3", suit: "♠ spades ♠" }];
    const game = new CardGame(playersPile, drawPile);

    expect(game.numberOfPlayers).toEqual(2);
    expect(game.playersPile).toEqual(playersPile);
    expect(game.drawPile).toEqual(drawPile);
    expect(game.actionCard).toBeNull();
    expect(game.discardPile).toEqual([{ rank: "3", suit: "♠ spades ♠" }]);
    expect(game.gameOver).toBeFalsy();
    expect(game.currentPlayerIndex).toEqual(0);
    expect(game.direction).toEqual(1);
    expect(game.topCard).toEqual({ rank: "3", suit: "♠ spades ♠" });
  });

  it("should draw a card from the draw pile", () => {
    const playersPile = [
      { id: 1, pile: [] },
      { id: 2, pile: [] },
    ];
    const drawPile = [
      { rank: "3", suit: "♠ spades ♠" },
      { rank: "4", suit: "♣ clubs ♣" },
    ];
    const game = new CardGame(playersPile, drawPile);

    const card = game.drawCard();

    expect(card).toEqual({ rank: "3", suit: "♠ spades ♠" });
    expect(game.drawPile).toEqual([]);
  });

  it("Should return the current player", () => {
    const playersPile = [
      { id: 1, pile: [] },
      { id: 2, pile: [] },
    ];
    const drawPile = [
      { rank: "3", suit: "♠ spades ♠" },
      { rank: "4", suit: "♣ clubs ♣" },
    ];
    const game = new CardGame(playersPile, drawPile);

    const currentPlayer = game.getCurrentPlayer();

    expect(currentPlayer).toEqual({ id: 1, pile: [] });
  });
});

describe("Handle Action card Ace", () => {
  it("should skip the next player", () => {
    const player1 = {
      id: 1,
      pile: [
        { rank: "6", suit: "♠ spades ♠" },
        { rank: "Ace", suit: "♠ spades ♠" },
      ],
    };
    const player2 = { id: 2, pile: [] };
    const drawPile = [
      { rank: "3", suit: "♠ spades ♠" },
      { rank: "2", suit: "♠ spades ♠" },
      { rank: "5", suit: "♠ spades ♠" },
      { rank: "4", suit: "♠ spades ♠" },
    ];
    const game = new CardGame([player1, player2], drawPile);
    game.playCard(1);
    expect(game.currentPlayerIndex).toEqual(0);
  });
});

describe("Handle Action card King", () => {
  it("should change the game direction to anti-clockwise", () => {
    const player1 = {
      id: 1,
      pile: [
        { rank: "6", suit: "♠ spades ♠" },
        { rank: "King", suit: "♠ spades ♠" },
      ],
    };
    const player2 = { id: 2, pile: [] };
    const drawPile = [
      { rank: "3", suit: "♠ spades ♠" },
      { rank: "2", suit: "♠ spades ♠" },
      { rank: "5", suit: "♠ spades ♠" },
      { rank: "4", suit: "♠ spades ♠" },
    ];
    const game = new CardGame([player1, player2], drawPile);
    game.playCard(1);
    expect(game.direction).toEqual(-1);
  });
});

describe("Handle Action card Queen", () => {
  it("should make the next player draw 2 cards", () => {
    const player1 = {
      id: 1,
      pile: [
        { rank: "6", suit: "♠ spades ♠" },
        { rank: "Queen", suit: "♠ spades ♠" },
      ],
    };
    const player2 = { id: 2, pile: [] };
    const drawPile = [
      { rank: "3", suit: "♠ spades ♠" },
      { rank: "2", suit: "♠ spades ♠" },
      { rank: "5", suit: "♠ spades ♠" },
      { rank: "4", suit: "♠ spades ♠" },
    ];
    const game = new CardGame([player1, player2], drawPile);
    game.playCard(1);
    expect(game.playersPile[1].pile.length).toEqual(2);
  });
});

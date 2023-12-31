// Card Game Class
class CardGame {
    constructor(playersPile, drawPile) {
      this.numberOfPlayers = playersPile.length;
      this.playersPile = playersPile;
      this.drawPile = drawPile;
      this.actionCard = null;
      this.discardPile = [];
      this.gameOver = false;
      this.currentPlayerIndex = 0;
      // 1: clockWise, -1: anti-clockWise
      this.direction = 1;
      // initializing the first discardPile
      this.topCard = null;
      let selectNonActionCard = false;
      let i = 1;
      while (!selectNonActionCard) {
        this.topCard = this.drawPile[drawPile.length - i];
        if (
          this.topCard.rank !== "Ace" &&
          this.topCard.rank !== "King" &&
          this.topCard.rank !== "Queen" &&
          this.topCard.rank !== "Jack"
        ) {
          this.discardPile.push(this.topCard);
          this.drawPile.pop();
          selectNonActionCard = true;
        }
        i++;
      }
    }
  
    // Draw Card from deck
    drawCard() {
      if (this.drawPile.length === 0) {
        this.gameOver = true;
        return null;
      }
      const card = this.drawPile.pop();
      return card;
    }
  
    // Get current Player details
    getCurrentPlayer() {
      let currentPlayer = this.playersPile[this.currentPlayerIndex];
      return currentPlayer;
    }
  
    // Handle action card
    handleActionCard() {
      switch (this.actionCard.rank) {
        case "Ace":
          console.log(`Playing Action card Ace`);
          this.updateCurrentPlayerIndex();
          console.log(`Skipping player ${this.getCurrentPlayer().id}`);
          this.updateCurrentPlayerIndex();
          break;
        case "King":
          console.log(`Playing Action card King`);
          this.direction *= -1;
          this.direction === 1
            ? console.log("Changing direction to clockWise")
            : console.log("Changing direction anti clockWise");
          this.updateCurrentPlayerIndex();
          break;
        case "Queen":
          console.log(`Playing Action card Queen`);
          let index = this.getNextPlayerIndex();
          console.log(`Player ${index + 1} draw 2 cards`);
          let playerPile = this.playersPile[index];
          for (let i = 0; i < 2; i++) {
            playerPile.pile.push(this.drawCard());
          }
          this.updateCurrentPlayerIndex();
          break;
        case "Jack":
          console.log(`Playing Action card Jack`);
          let indexJ = this.getNextPlayerIndex();
          console.log(`Player ${indexJ + 1} draw 4 cards`);
          let playerPileJ = this.playersPile[indexJ];
          for (let i = 0; i < 4; i++) {
            playerPileJ.pile.push(this.drawCard());
          }
          this.updateCurrentPlayerIndex();
          break;
      }
    }
  
    // Update player to the next player
    updateCurrentPlayerIndex() {
      let nextPlayerIndex = this.currentPlayerIndex + this.direction;
      if (nextPlayerIndex < 0)
        this.currentPlayerIndex = this.playersPile.length - 1;
      else if (nextPlayerIndex >= this.playersPile.length)
        this.currentPlayerIndex = 0;
      else this.currentPlayerIndex = nextPlayerIndex;
    }
    // Get index of next player based on direction of play
    getNextPlayerIndex() {
      let nextPlayerIndex = this.currentPlayerIndex + this.direction;
      if (nextPlayerIndex < 0) nextPlayerIndex = this.playersPile.length - 1;
      else if (nextPlayerIndex >= this.playersPile.length) nextPlayerIndex = 0;
      return nextPlayerIndex;
    }
  
    // Play card based on rule
    playCard(cardIndex) {
      if (this.gameOver) {
        return null;
      }
      const playerPile = this.getCurrentPlayer();
      const card = playerPile.pile[cardIndex];
      console.log(`Playing card: ${JSON.stringify(card)}`);
      playerPile.pile.splice(cardIndex, 1);
      if (playerPile.pile.length === 0) {
        this.gameOver = true;
        return null;
      }
      this.discardPile.push(card);
      if (
        card.rank === "Ace" ||
        card.rank === "King" ||
        card.rank === "Queen" ||
        card.rank === "Jack"
      ) {
        this.actionCard = card;
        this.handleActionCard();
      } else {
        this.topCard = card;
        this.updateCurrentPlayerIndex();
      }
    }
  
    // check whether player played a valid card or not
    isValidCard(cardIndex) {
      const playerPile = this.getCurrentPlayer();
      if (playerPile.pile.length > cardIndex) {
        const card = playerPile.pile[cardIndex];
        if (card.suit === this.topCard.suit || card.rank === this.topCard.rank)
          return true;
        else return false;
      }
      return false;
    }
  }
  
  module.exports = { CardGame };
  
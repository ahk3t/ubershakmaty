import Color from "./Color"
import whitePawnImage from "../assets/chessFigures/pawn_white.png"
import blackPawnImage from "../assets/chessFigures/pawn_black.png"
import whiteRookImage from "../assets/chessFigures/rook_white.png"
import blackRookImage from "../assets/chessFigures/rook_black.png"
import whiteKnightImage from "../assets/chessFigures/knight_white.png"
import blackKnightImage from "../assets/chessFigures/knight_black.png"
import whiteBishopImage from "../assets/chessFigures/bishop_white.png"
import blackBishopImage from "../assets/chessFigures/bishop_black.png"
import whiteQueenImage from "../assets/chessFigures/queen_white.png"
import blackQueenImage from "../assets/chessFigures/queen_black.png"
import whiteKingImage from "../assets/chessFigures/king_white.png"
import blackKingImage from "../assets/chessFigures/king_black.png"

export default class Piece {
  static MoveRange = Array(7)
    .fill()
    .map((_, i) => i + 1)
  MoveChecks = {
    isEmpty: (targetSquare) => !targetSquare.piece,
    isNotAlly: (targetSquare) =>
      !targetSquare.piece || this.color !== targetSquare.piece.color,
    isEnemy: (targetSquare) => {
      return targetSquare.piece && this.color !== targetSquare.piece.color
    },
  }

  constructor(color = null) {
    this.color = color
    this.square = null
    this.selected = false
  }

  static fromSymbol(symbol) {
    const color = symbol === symbol.toUpperCase() ? Color.WHITE : Color.BLACK

    const PieceClass = {
      p: Pawn,
      r: Rook,
      n: Knight,
      b: Bishop,
      q: Queen,
      k: King,
    }[symbol.toLowerCase()]

    return new PieceClass(color)
  }

  select() {
    const board = this.square.board

    if (this.color !== board.turn) return false

    board.unselectPiece()
    board.selectedPiece = this

    this.selected = true
    this.hintPossibleMoves()

    return true
  }

  hintPossibleMoves() {
    const {x, y} = this.square.getXY()
    const board = this.square.board
    const {isNotAlly, isEnemy} = this.MoveChecks

    for (const sequence of this.moveSequences) {
      for (const {dx = 0, dy = 0, checks = []} of sequence) {
        const targetSquare = board.getSquare(x + dx, y + dy)
        if (
          targetSquare &&
          isNotAlly(targetSquare) &&
          checks.every((check) => check(targetSquare))
        ) {
          targetSquare.possibleMove = true
          if (isEnemy(targetSquare)) break
        } else break
      }
    }
  }

  move(index) {
    const board = this.square.board
    const targetSquare = board.squares[index]

    if (!targetSquare.possibleMove) {
      return false
    }

    this.square.piece = null
    this.square = targetSquare
    targetSquare.piece = this

    board.unselectPiece()
    board.toggleTurn()

    return true
  }
}

export class Pawn extends Piece {
  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whitePawnImage : blackPawnImage
    this.firstMove = true

    const dyForward = this.color === Color.WHITE ? -1 : 1
    const {isEmpty, isEnemy} = this.MoveChecks
    this.moveSequences = [
      [
        {dy: dyForward, checks: [isEmpty]},
        {dy: 2 * dyForward, checks: [() => this.firstMove, isEmpty]},
      ],
      [{dx: -1, dy: dyForward, checks: [isEnemy]}],
      [{dx: 1, dy: dyForward, checks: [isEnemy]}],
    ]
  }

  move(index) {
    if (super.move(index)) {
      this.firstMove = false

      // TODO сделать меню выбора фигуры
      const upgradeY = this.color === Color.WHITE ? 0 : 7
      if (this.square.getXY().y == upgradeY) {
        const queen = new Queen(this.color)
        queen.square = this.square
        this.square.piece = queen
      }

      return true
    }
    return false
  }
}

export class Rook extends Piece {
  static moveSequences = [
    Piece.MoveRange.map((i) => ({dx: -i})),
    Piece.MoveRange.map((i) => ({dx: i})),
    Piece.MoveRange.map((i) => ({dy: -i})),
    Piece.MoveRange.map((i) => ({dy: i})),
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteRookImage : blackRookImage
    this.moveSequences = Rook.moveSequences
  }
}

export class Knight extends Piece {
  static moveSequences = [
    [{dx: -2, dy: -1}],
    [{dx: -2, dy: 1}],
    [{dx: -1, dy: -2}],
    [{dx: -1, dy: 2}],
    [{dx: 1, dy: -2}],
    [{dx: 1, dy: 2}],
    [{dx: 2, dy: -1}],
    [{dx: 2, dy: 1}],
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteKnightImage : blackKnightImage
    this.moveSequences = Knight.moveSequences
  }
}

export class Bishop extends Piece {
  static moveSequences = [
    Piece.MoveRange.map((i) => ({dx: -i, dy: -i})),
    Piece.MoveRange.map((i) => ({dx: i, dy: -i})),
    Piece.MoveRange.map((i) => ({dx: -i, dy: i})),
    Piece.MoveRange.map((i) => ({dx: i, dy: i})),
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteBishopImage : blackBishopImage
    this.moveSequences = Bishop.moveSequences
  }
}

export class Queen extends Piece {
  static moveSequences = [...Rook.moveSequences, ...Bishop.moveSequences]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteQueenImage : blackQueenImage
    this.moveSequences = Queen.moveSequences
  }
}

export class King extends Piece {
  static moveSequences = [
    [{dx: -1, dy: -1}],
    [{dx: -1, dy: 0}],
    [{dx: -1, dy: 1}],
    [{dx: 0, dy: 1}],
    [{dx: 1, dy: 1}],
    [{dx: 1, dy: 0}],
    [{dx: 1, dy: -1}],
    [{dx: 0, dy: -1}],
  ]

  constructor(color) {
    super(color)
    this.image = color === Color.WHITE ? whiteKingImage : blackKingImage
    this.moveSequences = King.moveSequences
  }
}
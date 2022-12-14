export enum PlayerLocation {
	SOUTH,
	EAST,
	NORTH,
	WEST
}

export type Suit = 'heart' | 'diamond' | 'club' | 'spade'

export type Card = {
	suit: Suit
	value: number
	owner: PlayerLocation
	id: number
}

export type Player = {
	id: number
	tricks: number
	computer: boolean
	controlled: boolean
	bid: number
	score: number
	win: boolean
}

export enum GameStep {
	NONE,
	HUMAN_PLAY,
	REMOTE_PLAY,
	COMPUTER_PLAY,
	WAIT,
	BID,
	WAIT_FOR_BID,
}
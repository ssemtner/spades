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
	selected: number | false
	tricks: number
	computer: boolean
	controlled: boolean
}
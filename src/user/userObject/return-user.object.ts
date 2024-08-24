import { Prisma } from '@prisma/client'

export const returnAdminListUserObject: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	username: true,
	email: true,
	role: true
}

export const returnAuthorObject: Prisma.UserSelect = {
	id: true,
	username: true,
	avatarPath: true
}

export const returnUserProfile: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	updatedAt: true,
	firstname: true,
	lastname: true,
	avatarPath: true,
	username: true,
	description: true,
	backgroundPath: true,
	phone: true,
	country: true,
	age: true,
	street: true,
	sex: true,
	isEmailValid: true,
	email: true,
	role: true
}

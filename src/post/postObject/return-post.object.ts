import { Prisma } from '@prisma/client'
import {
	returnAuthorObject,
	returnUserProfile
} from 'src/user/userObject/return-user.object'

export const returnShortPostObject: Prisma.PostSelect = {
	id: true,
	createdAt: true,
	title: true,
	slug: true,
	description: true,
	category: true,
	author: {
		select: returnAuthorObject
	},
	views: true,
	poster: true
}

export const returnFullPostObject: Prisma.PostSelect = {
	id: true,
	createdAt: true,
	title: true,
	slug: true,
	description: true,
	info: true,
	category: true,
	author: {
		select: returnUserProfile
	},
	views: true,
	poster: true
}

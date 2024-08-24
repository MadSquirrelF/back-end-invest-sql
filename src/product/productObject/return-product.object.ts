import { Prisma } from '@prisma/client'
import { returnReviewObject } from 'src/review/reviewObject/return-review.object'

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	createdAt: true,
	title: true,
	slug: true,
	description: true,
	category: true,
	views: true,
	brand: true,
	poster: true,
	reviews: {
		orderBy: {
			createdAt: 'desc'
		},
		select: returnReviewObject
	}
}

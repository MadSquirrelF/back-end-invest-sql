import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { returnReviewObject } from './reviewObject/return-review.object'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async create(userId: string, productId: string, dto: CreateReviewDto) {
		return this.prisma.review.create({
			data: {
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				},
				...dto
			}
		})
	}

	/* Запросы для админа */
	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObject
		})
	}

	async delete(id: string) {
		return this.prisma.review.delete({
			where: {
				id
			}
		})
	}
}

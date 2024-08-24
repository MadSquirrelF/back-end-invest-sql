import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnProductObject } from './productObject/return-product.object'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) this.search(searchTerm)

		return this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	private async search(searchTerm: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{ title: { contains: searchTerm, mode: 'insensitive' } },
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	async getBySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Товар не найден')

		return product
	}

	async updateCountViews(slug: string) {
		return this.prisma.product.update({
			where: {
				slug
			},
			data: {
				views: {
					increment: 1
				}
			}
		})
	}

	/* Запросы для админа */
}

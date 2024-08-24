import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import {
	returnFullPostObject,
	returnShortPostObject
} from './postObject/return-post.object'
import { CreatePostDto, PostBlockType } from './dto/create-new.dto'

@Injectable()
export class PostService {
	constructor(private prisma: PrismaService) {}

	async getAll(
		searchTerm?: string,
		limit: string = '8',
		page: string = '1',
		sort: string = 'createdAt',
		order: string = 'desc',
		date: string = 'all'
	) {
		const pageSize = parseInt(limit, 10)
		const pageNumber = parseInt(page, 10)

		// Начинаем с базового условия where
		const where: Prisma.PostWhereInput = {
			...(searchTerm && {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			})
		}

		// Обработка параметра date
		if (date && date !== 'all') {
			const startDate = new Date(`${date}-01-01T00:00:00Z`) // Начало года
			const endDate = new Date(`${date}-12-31T23:59:59Z`) // Конец года

			// Добавляем условие по дате в where
			where.createdAt = {
				gte: startDate,
				lte: endDate
			}
		}

		const [data, totalCount] = await this.prisma.$transaction([
			this.prisma.post.findMany({
				where,
				skip: (pageNumber - 1) * pageSize,
				take: pageSize,
				select: returnShortPostObject,
				orderBy: {
					[sort]: order // Сортировка по полю, переданному в параметрах
				}
			}),
			this.prisma.post.count({ where }) // Получаем общее количество записей
		])

		const totalPages = Math.ceil(totalCount / pageSize)
		const currentPage = pageNumber

		return {
			data,
			totalPages,
			currentPage,
			totalCount
		}
	}

	async getBySlug(slug: string) {
		const post = await this.prisma.post.findUnique({
			where: {
				slug
			},
			select: returnFullPostObject
		})

		if (!post) throw new NotFoundException('Новость не найдена')

		return post
	}

	async updateCountViews(slug: string): Promise<void> {
		await this.prisma.post.update({
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

	async create(dto: CreatePostDto, userId: string) {
		const blocks = dto.info.map(block => {
			if (block.type === PostBlockType.IMAGE) {
				return {
					type: block.type,
					imageUrl: block.imageUrl,
					title: block.title
				}
			} else if (block.type === PostBlockType.TEXT) {
				return {
					type: block.type,
					blockTitle: block.blockTitle,
					paragraphs: block.paragraphs
				}
			}
		})

		return this.prisma.post.create({
			data: {
				title: dto.title,
				slug: dto.slug,
				author: {
					connect: {
						id: userId
					}
				},
				description: dto.description,
				category: dto.category,
				info: blocks
			},
			select: returnShortPostObject
		})
	}

	async update() {}

	async delete() {}
}

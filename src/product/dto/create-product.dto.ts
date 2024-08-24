import { IsString } from 'class-validator'

export class CreateProductDto {
	@IsString()
	title: string

	@IsString()
	slug: string

	@IsString()
	description: string

	@IsString()
	poster: string

	@IsString()
	category: string

	@IsString()
	brand: string
}

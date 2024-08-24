import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

export enum PostBlockType {
	IMAGE = 'IMAGE',
	TEXT = 'TEXT'
}

export class PostBlockBase {
	@IsEnum(PostBlockType)
	type: PostBlockType
}

export class PostImageBlock extends PostBlockBase {
	type: PostBlockType.IMAGE = PostBlockType.IMAGE

	@IsString()
	imageUrl: string

	@IsString()
	title: string
}

export class PostTextBlock extends PostBlockBase {
	type: PostBlockType.TEXT = PostBlockType.TEXT

	@IsOptional()
	@IsString()
	blockTitle?: string

	@IsArray()
	@IsString({ each: true })
	paragraphs: string[]
}

type PostBlock = PostImageBlock | PostTextBlock

export class CreatePostDto {
	@IsString()
	title: string

	@IsString()
	slug: string

	@IsString()
	description: string

	@IsString()
	category: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => PostBlockBase)
	info: PostBlock[]
}

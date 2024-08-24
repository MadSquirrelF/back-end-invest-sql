import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query
} from '@nestjs/common'
import { PostService } from './post.service'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { CreatePostDto } from './dto/create-new.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	async getAll(
		@Query('_searchTerm') searchTerm?: string,
		@Query('_limit') limit?: string,
		@Query('_page') page?: string,
		@Query('_sort') sort?: string,
		@Query('_date') date?: string,
		@Query('_order') order?: string
	) {
		return this.postService.getAll(
			searchTerm,
			limit,
			page,
			sort,
			order,
			date
		)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.postService.getBySlug(slug)
	}

	@Post()
	@Auth('admin')
	async create(
		@CurrentUser('id') userId: string,
		@Body() dto: CreatePostDto
	) {
		return this.postService.create(dto, userId)
	}

	@HttpCode(204)
	@Patch('update-count-opened')
	async updateCountOpened(@Body('slug') slug: string): Promise<void> {
		await this.postService.updateCountViews(slug)

		return
	}
}

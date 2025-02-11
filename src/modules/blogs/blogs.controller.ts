import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post('create')
  async createBlog(@Body() body: { title: string; content: string; authorId: number }) {
    return this.blogsService.createBlog(body.title, body.content, body.authorId);
  }

  @Get()
  async getAllBlogs() {
    return this.blogsService.getAllBlogs();
  }

  @Get(':blogId')
  async getBlogById(@Param('blogId') blogId: number) {
    return this.blogsService.getBlogById(Number(blogId));
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async createBlog(title: string, content: string, authorId: number) {
    const blog = this.blogsRepository.create({ title, content, authorId, createdAt: new Date() });
    return this.blogsRepository.save(blog);
  }

  async getAllBlogs() {
    return this.blogsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getBlogById(blogId: number) {
    return this.blogsRepository.findOne({ where: { id: blogId } });
  }
}

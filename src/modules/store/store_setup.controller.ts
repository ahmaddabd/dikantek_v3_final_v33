import { Controller, Get } from '@nestjs/common';

@Controller('store/setup-progress')
export class StoreSetupController {
  @Get()
  getSetupProgress() {
    // يتم حساب نسبة التقدم بناءً على البيانات المسجلة للمتجر
    const completedSteps = 3; // مثال
    const totalSteps = 5;
    const progress = Math.round((completedSteps / totalSteps) * 100);
    
    return { progress };
  }
}

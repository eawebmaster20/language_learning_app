import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private currentCategory = '';

  constructor() {}

  setCurrentCategory(category: string) {
    return this.currentCategory = category
    console.log(this.currentCategory);
  }

  getCurrentCategory() {
    return this.currentCategory;
  }
}

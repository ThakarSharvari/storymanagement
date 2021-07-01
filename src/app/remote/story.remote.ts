import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { story } from '../models/story';


@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }
  page: number = 0;
  storyListData: story[] = []
  getListData() {
    return new Promise<story[]>((resolve, reject) => {
      this.http.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.page}`).subscribe((res: any) => {
        this.storyListData.push(...res.hits)
        resolve(res.hits)
      })
    })
  }

  getListDataOnInterval() {
    return new Promise((resolve, reject) => {
      this.http.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.page}`).subscribe((res: any) => {
        this.page++;
        this.storyListData.push(...res.hits)
        resolve("Success");
      })
    })
  }
}

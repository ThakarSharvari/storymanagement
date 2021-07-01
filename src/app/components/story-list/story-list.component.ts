import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, Subscription } from 'rxjs';
import { story } from 'src/app/models/story';
import { StoryService } from 'src/app/remote/story.remote';

@Component({
  selector: 'story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {

  constructor(private story: StoryService, private spinner: NgxSpinnerService, private route: Router) { }

  storyList: story[] = [];
  @ViewChild('table') table!: ElementRef;
  sub?: Subscription;
  page: number = 0;

  ngOnInit(): void {
    this.getDataOnInitialization();
    this.sub = interval(10000).subscribe((val) => { this.story.getListDataOnInterval(); });
  }

  getDataOnInitialization() {
    this.spinner.show();
    this.story.getListData().then((res: story[]) => {
      this.storyList = res;
      this.spinner.hide();
    });
  }

  tableScroll(event: any) {
    if (this.table.nativeElement.offsetHeight + this.table.nativeElement.scrollTop >= this.table.nativeElement.scrollHeight) {
      this.page++;
      let start_position: number = this.page * 20;
      let end_position = (this.page * 20) + 20 - 1
      var array: story[] = this.story.storyListData.slice(start_position, end_position + 1);
      if (array.length === 0) { this.page--; return; }
      this.storyList.push(...array)
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  viewRowData(id: string) {
    this.route.navigate([`/detailView/${id}`])
  }
}

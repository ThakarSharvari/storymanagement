import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { story } from 'src/app/models/story';
import { StoryService } from 'src/app/remote/story.remote';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private story: StoryService) { }
  rowId: string = '';
  storyData!: story | undefined;

  ngOnInit(): void {
    this.rowId = this.route.snapshot.params['id']
    this.getRowData(this.rowId)
  }

  getRowData(id: string) {
    this.storyData = this.story.storyListData.find(x => { return x.objectID === id })
  }
}

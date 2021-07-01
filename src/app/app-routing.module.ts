import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryDetailComponent } from './components/story-detail/story-detail.component';
import { StoryListComponent } from './components/story-list/story-list.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 'list', component: StoryListComponent },
  { path: 'detailView/:id', component: StoryDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

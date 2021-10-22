import { Component, OnInit, Input } from '@angular/core';
import { CreatorShare } from './creator-share.model';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-creator-share',
  templateUrl: './creator-share.component.html',
  styleUrls: ['./creator-share.component.scss']
})
export class CreatorShareComponent implements OnInit {

  @Input() data!: CreatorShare;
  @Input() index!: number;
  constructor(
    public projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

}

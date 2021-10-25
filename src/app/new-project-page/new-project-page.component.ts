import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { ProjectService } from '../project-tools/project.service';

@Component({
  selector: 'app-new-project-page',
  templateUrl: './new-project-page.component.html',
  styleUrls: ['./new-project-page.component.scss']
})
export class NewProjectPageComponent implements OnInit {

  constructor(
    private router: Router,
    public projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  addLayers(): void {
    this.router.navigateByUrl('add-layers');
  }

  generationSettings(): void {
    this.router.navigateByUrl('generation-settings');
  }

  generate(): void {
    this.router.navigateByUrl('generate');
  }

  editProject(): void {
    this.router.navigateByUrl('edit-project-settings');
  }

  backToHome(): void {
    this.router.navigateByUrl('');
  }
}

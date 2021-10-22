import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-layer-variations-page',
  templateUrl: './edit-layer-variations-page.component.html',
  styleUrls: ['./edit-layer-variations-page.component.scss']
})
export class EditLayerVariationsPageComponent implements OnInit {

  id!: number;
  activatedRouteListener!: Subscription;

  constructor(
    private router: Router,
    public projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouteListener = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnDestroy(): void {
    if (this.activatedRouteListener.closed === false) {
      this.activatedRouteListener.unsubscribe();
    }
  }

  backToLayers(): void {
    this.router.navigateByUrl('add-layers');
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}

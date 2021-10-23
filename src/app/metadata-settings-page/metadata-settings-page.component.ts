import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metadata-settings-page',
  templateUrl: './metadata-settings-page.component.html',
  styleUrls: ['./metadata-settings-page.component.scss']
})
export class MetadataSettingsPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  backToProject(): void {
    this.router.navigateByUrl('start-new-project');
  }

}

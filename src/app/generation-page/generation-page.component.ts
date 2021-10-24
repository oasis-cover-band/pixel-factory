import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-generation-page',
  templateUrl: './generation-page.component.html',
  styleUrls: ['./generation-page.component.scss']
})
export class GenerationPageComponent implements OnInit {

  @ViewChild('SVGElement') SVGElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
  }

}

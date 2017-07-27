import { Component, OnInit } from '@angular/core';

import { SeoService } from "../shared/services/seo.service";
import { SeoModel } from "../shared/models/seo-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(seoService: SeoService) {

    let seoModel: SeoModel = <SeoModel>{
      title: 'Seja bem vindo',
      robots: 'Index, Follow'
    };

    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
  }

}

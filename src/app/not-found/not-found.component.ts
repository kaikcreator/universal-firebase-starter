import { RESPONSE } from '@nguniversal/express-engine/tokens'
import { Component, OnInit, Inject, Optional } from '@angular/core'
import { Response } from 'express'


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit {
  private response: Response;
  constructor(@Optional() @Inject(RESPONSE) response: any) {
    this.response = response;
  }

  ngOnInit() {
    if (this.response) {
      // response will only be if we have express
      // this.response.statusCode = 404;
      this.response.status(404);
    }
  }
}

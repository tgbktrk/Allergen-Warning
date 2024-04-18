import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllergenService } from 'src/app/services/allergen.service';


@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.page.html',
  styleUrls: ['./allergens.page.scss'],
})
export class AllergensPage implements OnInit {
  allergen = null;
  allergens: any;

  constructor(private route: ActivatedRoute, private allergenService: AllergenService) {
   
   }

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    // this.alergens = JSON.parse(params['scannedResult']);
    this.allergens =JSON.parse(params['data']);
    // this.scannedResult = params['scannedResult'];
    console.log('data coming to new page:');
    console.log(this.allergens);
    // console.log(this.scannedResult.product.allergens);
  });
  // const barcode = this.route.snapshot.paramMap.get('barcode');
  // this.allergenService.getAllergens(barcode).subscribe((res) => {
  //   console.log(res);
  //   //this.allergen = res;
  // });
}

}

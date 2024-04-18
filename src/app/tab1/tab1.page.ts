import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { NavController } from '@ionic/angular';
import * as JsBarcode from 'jsbarcode';
import { Observable } from 'rxjs';
import { AllergenService } from 'src/app/services/allergen.service';
import { AllergensPage } from '../pages/allergens/allergens.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  //https://www.npmjs.com/package/angularx-qrcode
  //https://www.npmjs.com/package/jsbarcode
  qrCodeString = 'string';
  barCodeString = 'b';
  scannedResult: any;
  content_visibility = '';

  constructor(
    private allergenService: AllergenService,
    private navctrl: NavController,
    private router: Router
  ) {
    };
  
  redirectToPage(data:any){
    
   var throughput = JSON.stringify(data.product.allergens);
    console.log('throughput =');
    console.log(throughput);
    this.router.navigate(['/allergens'], { queryParams: { data: throughput }});
    //this.navctrl.navigateForward('allergens');
  }
  
ngOnInit(): void {
  JsBarcode("#barcode", this.barCodeString, {
    // format: "pharmacode",
    lineColor: "#0aa",
    width:4,
    height:180,
    displayValue: false
  });
  // this.allergenService.getProducts(this.scannedResult).subscribe((res) => {
  //   this.scannedResult = res;
  //  // console.log(res);
  // });
}
  
  // startScan(){
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedResult = barcodeData?.text;
  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }

  async checkPermission(){
    try{
      //check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if(status.granted){
        //the user granted permission
        return true;
      }
      return false;
    }
      catch(e){
      console.log(e);
    }
    return false;
  }


  async startScan(){
    try{
      const permission = await this.checkPermission();
      if(!permission){
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      this.content_visibility = '';
      if(result?.hasContent){
        console.log('result :'+ result.content);
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        this.scannedResult = result.content;
        this.allergenService.getProducts(this.scannedResult).subscribe((res) => {
          this.scannedResult = res;
         console.log('json object = ');
         console.log(res);
         this.redirectToPage(res);
      })}
    } catch(e){
      console.log(e);
      this.stopScan();
    }
  }

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.content_visibility = '';
  }

 async testScan(){
   var fanta = '5000112547498';
   var nutella = '3017624010701';
    this.scannedResult = fanta;
    console.info('result = ' + this.scannedResult);
    this.allergenService.getProducts(this.scannedResult).subscribe((res) => {
    this.scannedResult = res;
    console.log('json object = ');
    console.log(res);
    this.redirectToPage(res);
  });
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:CarDetail[]=[];
  carDetails:CarDetail[] = [];
  filterText ="";
  currentCarDetail:CarDetail;
  dataLoaded = false;
  constructor(private carDetailService: CarDetailService,
     private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }
      else if(params["carId"]){
        this.getCarDetailByCarId(params["carId"])
      }
      else {
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number) {
    this.carDetailService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId:number) {
    this.carDetailService.getCarsByColor(colorId).subscribe((response) => {
       this.carDetails = response.data;
       this.dataLoaded = true;
    });
   }

   getCarDetailByCarId(carId:number){
    this.carDetailService.getCarDetailByCarId(carId).subscribe((response) =>{
      this.carDetails=response.data;
    })
   }

   setCurrentCarDetail(carDetail:CarDetail){
    this.currentCarDetail = carDetail;
 }
}


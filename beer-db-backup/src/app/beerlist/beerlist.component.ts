import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Beer } from '../beerlist/beer.model';
import { BeerImage} from '../beerlist/beerimage.model';
import { BeerService } from '../beerlist/beer.service';

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.css']
})
export class BeerlistComponent implements OnInit {
  //displayedColumns: string[] = ['item', 'date', 'duedate', 'clientname','qty','tax','rate','action'];
  displayedColumns: string[] = ['images','id', 'name', 'abv', 'ibu','style','ounces'];
  
  @ViewChild(MatPaginator) paginator  : MatPaginator;
  beers:Beer[]=[];
  imagePath:string[]=[];
  constructor(private beerService:BeerService) { }
    loadin = false;
    public pageSlice = this.beers.slice(0,20);
    totalBeers =2410;
    beersPerPage =20;
    pageSizeOptions = [20,50,100,500];
    brand='';
    
     index=0;

  ngOnInit(): void {
    this.loadin = true;
    


    this.beerService.getBeersList().subscribe(
      (beers:Beer[])=>{
        this.loadin = false;
        for(let beer of beers){
          if(this.index<5){
            beer.imagePath=this.imagePath[this.index++];
          }
          else{
            this.index=0;
            beer.imagePath=this.imagePath[this.index++];
          }
         
        }
        this.beers=beers;
        //console.log(this.beers);
      });

      this.beerService.getImageList().subscribe(
        (imagePath:BeerImage[])=>{
          for(let myimage of imagePath){
            this.imagePath.push(myimage.image);
          }
           // console.log(this.imagePath);
      });

  }


  onChangePage(pageData:PageEvent){
    console.log(pageData);
    const startIndex=pageData.pageIndex * pageData.pageSize;
    let endIndex = startIndex + pageData.pageSize;
    if(endIndex>this.beers.length){
      endIndex=this.beers.length;
    }
    this.pageSlice = this.beers.slice(startIndex,endIndex)
    //console.log(this.pageSlice);
  }

  searchBrand(){
      if(this.brand==" "){
        this.ngOnInit();
      }
      else{
        this.beers=this.beers.filter(res=>{
          return res.name.toLocaleLowerCase().match(this.brand.toLocaleLowerCase());
        })
      }
  }

}

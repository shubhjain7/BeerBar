import { Injectable } from '@angular/core';
import { Beer } from '../beerlist/beer.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn:"root"})
export class BeerService{
    private beers : Beer[]=[];
    private imagePath : string[]=[];
    constructor(private http:HttpClient){}

    getBeersList(): Observable<any>{
        return this.http.get<Beer[]>('https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json');
    }

    getImageList():Observable<any>{
        return this.http.get<string[]>('https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json');
    }
}
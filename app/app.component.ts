import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Tap Room</h1>
  <div class="kegs">
    <ul *ngFor="let keg of kegs">
      <li class="name">Name: {{keg.name}}</li>
      <li class="brand">Brand: {{keg.brand}}</li>
      <li [class]="priceColor(keg)">Price: \${{keg.price}}</li>
      <li [class]="abvLvl(keg)">ABV: {{keg.abv}}%</li>
      <li [class]="lessThan10(keg)" class="abv">Pints Remaining: {{keg.pintsRemaining}}</li>
      <button (click)="editKeg(keg)">Edit</button>
      <button (click)="sellPint(keg)">Sell A Pint</button>
    </ul>
    <hr>
  </div>

  <h3>Add A New Keg</h3>
  <input type="text" #name placeholder="name" required>
  <input type="text" #brand placeholder="brand" required>
  <input type="text" #price placeholder="price" required>
  <input type="text" #abv placeholder="abv" required>
  <button (click)="addKeg(name.value, brand.value, price.value, abv.value)">Add Keg</button>
  <hr>

  <div *ngIf="selectedKeg">
    <h3>Edit {{selectedKeg.name}}</h3>
    <p>{{selectedKeg.brand}}</p>
    <p>{{selectedKeg.price}}</p>
    <p>{{selectedKeg.abv}}</p>
    <h3>Edit Keg</h3>
    <label>Name:</label>
    <input type="text" [(ngModel)]="selectedKeg.name">
    <label>Brand:</label>
    <input type="text" [(ngModel)]="selectedKeg.brand">
    <label>Price:</label>
    <input type="text" [(ngModel)]="selectedKeg.price">
    <label>ABV:</label>
    <input type="text" [(ngModel)]="selectedKeg.abv">
    <button (click)="sellPint(selectedKeg)">Sell A Pint</button>
    <button (click)="doneEditing()">Done</button>
  </div>

`,
})

export class AppComponent {
  kegs: Keg[] = [
    new Keg("Hard Cider", "Seattle Cider", 7, 6.5),
    new Keg("Blonde Ale", "Hellbent", 5, 4.5),
    new Keg("IPA", "192 Brewing", 9, 7.5)
  ];

  selectedKeg = null;

  addKeg(name, brand, price, abv) {
    this.kegs.push(new Keg(name, brand, parseInt(price), parseInt(abv)));
  }

  editKeg(keg) {
    this.selectedKeg = keg;
  }

  doneEditing() {
    this.selectedKeg = null;
  }

  sellPint(keg) {
    keg.pintsRemaining -= 1;
  }

  lessThan10(keg) {
    if(keg.pintsRemaining <= 10) {
      console.log("danger");
      return "bg-danger";
    } else {
      console.log("success");
      return "bg-success";
    }
  }

  priceColor(keg) {
    if(keg.price < 6) {
      return "bg-info";
    } else if (keg.price < 8) {
      return "bg-warning";
    } else {
      return "bg-primary";
    }
  }

  abvLvl(keg) {
    if(keg.abv > 7) {
      return "expensive";
    }
  }
}

export class Keg {
  public pintsRemaining: number = 124;
  constructor(public name: string, public brand: string, public price: number, public abv: number) {}
}

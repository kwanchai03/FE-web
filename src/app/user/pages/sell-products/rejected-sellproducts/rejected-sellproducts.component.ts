import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rejected-sellproducts',
  templateUrl: './rejected-sellproducts.component.html',
  styleUrls: ['./rejected-sellproducts.component.css']
})
export class RejectedSellproductsComponent implements OnInit {

  count_ind: any;

  seller_products: any;

  reciever = [];
  quantity = [];
  product_delivery = [];
  price_all = [];
  name_products = [];

  order_item = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    this.count_ind = 0;
    this.get_products();
  }

  get_products() {

    this.userService.getseller_products().subscribe(
      res => {
        console.log('res_ordercomplete=>', res['body'].order_item);

        this.seller_products = res['body'].order_item;

        for (let i = 0; i < this.seller_products.length; i++) {
          if (this.seller_products[i].status === 'REJECTED') {
            console.log('complete_product=>', this.seller_products[i]);
            this.order_item[this.count_ind] = this.seller_products[i];

            this.reciever[this.count_ind] = this.order_item[this.count_ind].delivery_address.receiver;
            this.quantity[this.count_ind] = this.order_item[this.count_ind].quantity;
            this.product_delivery[this.count_ind] = this.order_item[this.count_ind].product_delivery.type;
            this.price_all[this.count_ind] = (this.order_item[this.count_ind].price * this.quantity[this.count_ind])
              + this.order_item[this.count_ind].product_delivery.price_ship;
            this.name_products[this.count_ind] = this.order_item[this.count_ind].product.name_product;

            this.count_ind ++;
          }
        }
      }, err => {
        console.log('res_complete=>', err);
      }
    );

  }


  go_detail(ind: any) {
    // alert(this.seller_products[ind].id_item);
    const go_page = '5_'  + this.order_item[ind].id_item;
   this.router.navigate(['user/sellProducts/manage-ordered/', go_page]);
}

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
import { FormPage } from './../form/form.page';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  contacts=[];
  item: any;
  constructor(private apiService: ApiService,public modalController: ModalController) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.apiService.getData().subscribe(data=>this.contacts=data);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FormPage,
      componentProps: {
        'person': {
          "id": this.contacts.length,
          "image":"../../assets/icon/avatar.png",
          "firstName": "",
          "lastName": "",
          "email": "",
          "phone": "",
          "category": ""
        },

      }
    });
    const values = await modal.present();
    const { data } = await modal.onWillDismiss();
    this.item = data.person;
    this.contacts.push(data.person)
    console.log(data);
  }
}

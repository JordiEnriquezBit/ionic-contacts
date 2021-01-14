import { Component, Input, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { PhotoService } from "../services/photo.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.page.html",
  styleUrls: ["./form.page.scss"],
})
export class FormPage implements OnInit {
  person = null;
  constructor(
    private photoService: PhotoService,
    private navParams: NavParams,
    public modalController: ModalController
  ) {
    // componentProps can also be accessed at construction time using NavParams
    this.person = navParams.get("person");
    //console.log(navParams.get('person'));
  }

  ngOnInit() {}

  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => {
        this.modalController = null;
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      person: this.person,
    });
  }
  addPhotoToGallery() {
    let image = this.photoService.addNewToGallery();
    image.then((data) => {
      this.person.image =data
    });
  }
}

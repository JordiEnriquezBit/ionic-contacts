import { Component, Input, OnInit } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { PhotoService } from "../services/photo.service";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-form",
  templateUrl: "./form.page.html",
  styleUrls: ["./form.page.scss"],
})
export class FormPage implements OnInit {
  person = null;
  formGroup : FormGroup;

  constructor(
    private photoService: PhotoService,
    private navParams: NavParams,
    public modalController: ModalController,
    private fb: FormBuilder
  ) {
    // componentProps can also be accessed at construction time using NavParams
    this.person = navParams.get("person");
    this.buildForm();
    //console.log(navParams.get('person'));
  }

  ngOnInit() {
   
  }

  private buildForm(){
    this.formGroup = this.fb.group({
      firstName: [this.person.firstName, [Validators.required,Validators.minLength(4)]],
      lastName: [this.person.lastName, [Validators.required,Validators.minLength(4)]],
      email: [this.person.email, [
        Validators.required, Validators.email
      ]],
      phone: [this.person.phone, Validators.required],
      image:[this.person.image],
      id:[this.person.id]
    });
  }

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
      person: this.formGroup.value,
    });
  }
  addPhotoToGallery() {
    let image = this.photoService.addNewToGallery();
    image.then((data) => {
      let image = this.formGroup.get("image");
      image.setValue(data);
      this.person.image =data
    });
  }
}

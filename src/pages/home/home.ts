import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';

import {CloudService} from '../../providers/cloud-service';
import {ConfigService} from '../../providers/config-service';
import {CategoryPage} from '../category/category';
import {AddCategoryModal} from '../addCategoryModal/modal-content';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	menu: any;

	//page event handlers
	private fetchMenuEvent: (menu) => void;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public configService: ConfigService,
  	public events: Events,
  	public cloudService: CloudService,
  	public modalCtrl: ModalController,
  ) {

  }

  openModal() {
    let modal = this.modalCtrl.create(AddCategoryModal);
    modal.present();
  }

  ionViewWillEnter(){
    this.initializeEventHandlers();
    this.subscribeEvents();
  }

  ionViewWillLeave() {
    this.unsubscribeEventHandlers();
  }

  ionViewDidLoad() {
    let me = this;
    me.menu = me.cloudService.getMenu();   
  }

  initializeEventHandlers(){
    this.initializeFetchMenuEvent();
  }

  initializeFetchMenuEvent(){
  	let me = this;
    this.fetchMenuEvent = (menu) => {
      me.menu = menu;
    };
  }

  subscribeEvents(){   
  	this.events.subscribe('fetchMenu:event', this.fetchMenuEvent);
  }

  unsubscribeEventHandlers(){
    this.unsubscribeFetchMenuEvent();
  }

  unsubscribeFetchMenuEvent(){
  	if(this.fetchMenuEvent){
      this.events.unsubscribe('fetchMenu:event', this.fetchMenuEvent);
      this.fetchMenuEvent = undefined;
    }
  }

  viewCategory(category) {
    this.navCtrl.push(CategoryPage, {category: category});
  }

}

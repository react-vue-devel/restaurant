import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

import { CloudService } from './cloud-service';

import Parse from 'parse';

/*
  Generated class for the MenuService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MenuService {

	menu: any;

  constructor(
  	public http: Http,
  	public events: Events,
  	public cloudService: CloudService,
  ) {
    let me = this;
    me.fetchMenu();
  }

  getMenu(){
  	return this.menu;
  }

  fetchMenu(){
  	let me = this;
    return new Promise((resolve, reject) => {
    	Parse.Cloud.run('getMenu').then(function(menu) {
      	me.menu = menu;
      	me.events.publish('fetchMenu:event', me.menu);
        resolve(me.menu);
  	  });
    });
  }

  addMenuCategory(name, images){
    var me = this;
    var Menu = Parse.Object.extend("Menu");
    var menu = new Menu();
    menu.set("name", name);

    return new Promise((resolve, reject) => {
    	me.cloudService.saveFiles(images).then((files)=>{
    		var relation = menu.relation("images");
    		for(let i=0;i<files["length"];i++){
    			relation.add(files[i]);
    		}
    		menu.save(null, {
			  success: function(saveMenuCategory) {
			    me.fetchMenu().then((m) => {
            resolve(m);
          });
			    
			  },
			  error: function(gameScore, error) {
			    reject(error);
			  }
			});
    	});
    });
    
  }

  saveMenuCategory(menu){
  	return new Promise((resolve, reject) => {
      menu.save(null, {
        success: function(menu) {
          resolve(menu);
        },
        error: function(menu, error) {
          reject(error);
        }
      });
    });
  }
}

// function getMenu(){
// 	return new Promise((resolve, reject) => {
// 		console.log("cloud : getMenu");
// 		var menuReturnObject = {};
// 	  	var Menu = Parse.Object.extend("Menu");
// 		var menuQuery = new Parse.Query(Menu);
// 		menuQuery.include("images");
// 		menuQuery.include("items");
// 		menuQuery.find({
// 		  success: function(menu) {
// 		  	console.log("menu has : " + menu.length + " many items");
// 		    menuReturnObject["array"] = menu;
// 		    menuArrayToMap(menu).then((map) => {
// 		    	menuReturnObject["map"] = map;
// 		    	console.log("response.success");
// 		    	resolve(menuReturnObject);
// 		    });
// 		  },
// 		  error: function(error) {
// 		    reject(error);
// 		  }
// 		});
// 	});
// }

// function menuArrayToMap(array){
// 	console.log("cloud : menuArrayToMap");
// 	var menuMap = {};
// 	var ajaxCallsRemaining = array.length;
// 	console.log("ajaxCallsRemaining : " + ajaxCallsRemaining);
// 	return new Promise((resolve, reject) => {
// 		for (var i = 0; i < array.length; i++) {
// 			console.log("Menu obj : " + array[i].id);
// 			menuMap[array[i].id] = {
// 				object:array[i],
// 				items:null,
// 				images:null
// 			};
// 			getRelationObjects(array[i], "items").then((items) => {
// 				console.log("getRelationObjects items returnd : " + items);
// 				menuMap[items["obj"].id].items = items["returnObject"];

// 				getRelationObjects(items["obj"], "images").then((images) => {
// 					console.log("getRelationObjects images returnd : " + images);
// 					menuMap[images["obj"].id].images = images["returnObject"];
// 					--ajaxCallsRemaining;
// 					console.log("ajaxCallsRemaining : " + ajaxCallsRemaining);
// 					if (ajaxCallsRemaining <= 0) {
// 						console.log("resolve menuMap");
// 						resolve(menuMap);
// 					}
// 				});
// 			});
// 		}
// 	});
		
// }


// function getRelationObjects(obj,relationName){
// 	console.log("cloud : getRelationObjects for obj : " + obj.id + " relationName : " + relationName);
// 	return new Promise((resolve, reject) => {
// 		var returnObject = {
// 			array: null,
// 			map: null
// 		}; 
// 		var relation = obj.relation(relationName);
// 		var query = relation.query();
// 		query.find({
// 		  success: function(results){
// 		  	console.log("getRelationObjects-> relationName: " + relationName  + " total : " + results.length);
// 		  	returnObject.array = results;
// 		  	returnObject.map = arrayToMap(results);
// 		  	console.log("resolve getRelationObjects : returnObject : " + returnObject);
// 		  	resolve({returnObject:returnObject, obj:obj});
// 		  }
// 		});
// 	});
// }

// function arrayToMap(array){
// 	console.log("converting arrayToMap length : " + array.length);
// 	var map = {};
// 	for (var i = 0; i < array.length; i++) {
// 		map[array[i].id] = array[i];
// 	}
// 	console.log("arrayToMap return : " + map);
// 	return map;
// }
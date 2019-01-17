var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { BlanchesPage } from '../blanches/blanches';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchJaunePage } from '../search-jaune/search-jaune';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
var JaunesPage = /** @class */ (function () {
    // @ViewChild('searchbar') searchBox: Searchbar;
    function JaunesPage(navCtrl, navParams, el, geolocation, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.el = el;
        this.geolocation = geolocation;
        this.storage = storage;
        this.searchTerm = new Subject();
        this.searchTermOu = new Subject();
        this.quiquoi = '';
        this.ou = '';
        //tel: string ='0522777100';
        this.tel = '';
        this.searching = false;
        this.showBlanches = false;
        this.showJaune = false;
        this.storageVille = [{ icon: '', 'Autour de moi':  }];
        this.hasFocus = false;
    }
    JaunesPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log('Location', resp);
            _this.lat = resp.coords.latitude;
            _this.lng = resp.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    JaunesPage.prototype.getHistoriqueVille = function () {
        var _this = this;
        this.storage.get('storeVil').then(function (val) {
            _this.storageVille = val;
            console.log('Your age is', _this.storageVille);
        });
        return this.storageVille;
    };
    JaunesPage.prototype.onGoBlanchesPage = function () {
        var _this = this;
        this.showBlanches = true;
        this.showJaune = false;
        setTimeout(function () {
            _this.searchTel.setFocus();
        }, 500);
    };
    JaunesPage.prototype.onGoJaunesPage = function () {
        var _this = this;
        this.showBlanches = false;
        this.showJaune = true;
        setTimeout(function () {
            _this.searchBox.setFocus();
        }, 500);
    };
    JaunesPage.prototype.search = function (term) {
        this.searchTerm.next(term);
    };
    JaunesPage.prototype.searchVille = function (term) {
        this.searchTermOu.next(term);
    };
    JaunesPage.prototype.back = function (lat, lng) {
        this.navCtrl.push('SearchPage', { lat: this.lat, lng: this.lng });
    };
    JaunesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getLocation();
        // recuperation de type pro ou inv pour savoir quel est à afficher
        this.type = this.navParams.get('type');
        this.lat = this.navParams.get('lat');
        this.lng = this.navParams.get('lng');
        // ici le test sur pro ou inv 
        if (this.type === "inv") {
            this.onGoBlanchesPage();
            console.log('onGoBlanchesPage');
        }
        else {
            this.onGoJaunesPage();
            console.log('onGoJaunesPage');
        }
        this.searching = false;
        this.xmlItems$ = this.searchTerm.pipe(debounceTime(100), distinctUntilChanged(), switchMap(function (term) { return _this.auto_quiquoiLoadXML(term); }));
        this.xmlOu$ = this.searchTermOu.pipe(debounceTime(100), distinctUntilChanged(), switchMap(function (term) { return _this.auto_ouLoadXML(term); }));
    };
    JaunesPage.prototype.selectValueQuiquoi = function (item) {
        var _this = this;
        console.log(item);
        this.quiquoi = item.title;
        this.xmlItems$ = this.searchTerm.pipe(debounceTime(1500), distinctUntilChanged(), switchMap(function (term) { return _this.auto_quiquoiLoadXML(term); }));
    };
    JaunesPage.prototype.selectValueOu = function (item) {
        var _this = this;
        this.storageVille.push(item.title);
        this.storage.set('storeVil', this.storageVille);
        console.log('iieiei', item);
        this.ou = item.title;
        this.xmlOu$ = this.searchTermOu.pipe(debounceTime(1000), distinctUntilChanged(), switchMap(function (term) { return _this.auto_ouLoadXML(term); }));
    };
    JaunesPage.prototype.selectValueOuHistorique = function (item) {
        console.log('iieiei', item);
        this.ou = item;
        this.storageVille = [];
        //this.storage.set('storeVille',item.storeVille);
    };
    JaunesPage.prototype.onSearchInput = function () {
        this.searching = true;
    };
    JaunesPage.prototype.checkFocusQuiquoi = function () {
        //pour ne pas initialiser la liste des villes par autour de moi
        this.hasFocus = false;
    };
    JaunesPage.prototype.checkFocus = function () {
        var _this = this;
        this.xmlItems$ = this.searchTerm.pipe(debounceTime(1500), distinctUntilChanged(), switchMap(function (term) { return _this.auto_quiquoiLoadXML(term); }));
        //pour  initialiser la liste des villes par autour de moi
        this.hasFocus = true;
        //storage recuperer value d historique
        console.log('fff', this.storageVille);
    };
    /* onSubmitForm(quioui: string, ou: string){
      
    }*/
    // permet de tester si quiquoi ou ville est vide sinon il redirege vers la page search-jaune
    JaunesPage.prototype.onDisplay = function (quiquoi, ou, lat, lng) {
        var _this = this;
        console.log('itemitemitemitem');
        if (this.quiquoi == '' || this.quiquoi == null) {
            setTimeout(function () {
                _this.searchBox.setFocus();
            }, 10);
        }
        else if (this.ou == '' || this.ou == null) {
            setTimeout(function () {
                _this.searchVil.setFocus();
                console.log('Focus', _this.searchVil);
            }, 10);
        }
        else if (this.ou == 'autour de moi' || this.ou == "Autour de moi") {
            this.navCtrl.push('AutourMoiPage', { ou: this.ou, quiquoi: this.quiquoi, lat: this.lat, lng: this.lng });
            console.log('AutourMoiPage oui');
        }
        else {
            this.navCtrl.push(SearchJaunePage, { ou: this.ou, quiquoi: this.quiquoi, lat: this.lat, lng: this.lng });
            console.log('SearchJaunePage oui');
        }
    };
    JaunesPage.prototype.onDisplayBlanches = function (tel) {
        var _this = this;
        if (this.tel == '' || this.tel == null) {
            setTimeout(function () {
                _this.searchTel.setFocus();
            }, 10);
        }
        else {
            this.navCtrl.push(BlanchesPage, { tel: this.tel });
            //this.navCtrl.push(BlanchesPage);         
        }
        console.log('Focus ccc');
    };
    JaunesPage.prototype.auto_quiquoiLoadXML = function (term) {
        return this.auto_quiquoiParseXML(term);
    };
    JaunesPage.prototype.auto_ouLoadXML = function (term) {
        return this.auto_ouParseXML(term);
    };
    JaunesPage.prototype.auto_quiquoiParseXML = function (quiquoi) {
        var yyy = [];
        return new Promise(function (resolve, reject) {
            var autocomplete_quiquoi = quiquoi;
            var data_send = '<?xml version="1.0" encoding="UTF-8" ?>';
            data_send += '  <methodcall>';
            data_send += '    <methodname call="ann_sug">';
            data_send += '      <params>';
            data_send += '        <value>';
            data_send += '          <string>' + autocomplete_quiquoi + '</string>';
            data_send += '          <extract>5</extract>';
            data_send += '        </value>';
            data_send += '      </params>';
            data_send += '    </methodname>';
            data_send += '  </methodcall>';
            $.ajax({
                type: "POST",
                url: "https://www.telecontact.ma/WsMobTlC2014nVZA",
                /*headers: {accepts: '*'}:*/
                crossDomain: true,
                beforeSend: function () { $("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>'); /*$.mobile.loading('show')*/ },
                complete: function () { $("#results_loading").hide(); /*$.mobile.loading('hide')*/ },
                data: { telecontact: data_send },
                dataType: 'text',
                success: function (response) {
                    response = response.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
                    var parser = new xml2js.Parser({
                        trim: true,
                        explicitArray: true
                    });
                    parser.parseString(response, function (err, result) {
                        console.log('result', result);
                        console.log('err', err);
                        for (var _i = 0, _a = result.search_answers.search_answer; _i < _a.length; _i++) {
                            var answers = _a[_i];
                            // console.log('answers d',answers.items[0].$.count);
                            if (answers.items[0].item) {
                                console.log('result resultat');
                                for (var _b = 0, _c = answers.items; _b < _c.length; _b++) {
                                    var item = _c[_b];
                                    for (var _d = 0, _e = item.item; _d < _e.length; _d++) {
                                        var i = _e[_d];
                                        yyy.push({ 'title': i.name[0] });
                                        /*for(let i_data of i.item_data){
                                           //console.log(i_data.data[1]._, i_data.data[1].$.name);
                                           yyy.push({'title': i_data.data[1]._});
                                          for(let data of i_data.data){
                                           
                                            yyy.push({key: data.$.name, value: data._});
                                            
                                          }
                                        }*/
                                    }
                                }
                            }
                        }
                        resolve(yyy);
                    });
                },
                error: function (error) {
                    console.log(error);
                    reject();
                }
            });
        });
    };
    JaunesPage.prototype.auto_ouParseXML = function (ou) {
        var yyy = [];
        return new Promise(function (resolve, reject) {
            var autocomplete_ou = ou;
            var data_send = '<?xml version="1.0" encoding="UTF-8" ?>';
            data_send += '  <methodcall>';
            data_send += '    <methodname call="ann_sug">';
            data_send += '      <params>';
            data_send += '        <value>';
            data_send += '          <ou>' + autocomplete_ou + '</ou>';
            data_send += '          <extract>5</extract>';
            data_send += '        </value>';
            data_send += '      </params>';
            data_send += '    </methodname>';
            data_send += '  </methodcall>';
            $.ajax({
                type: "POST",
                url: "https://www.telecontact.ma/WsMobTlC2014nVZA",
                /*headers: {accepts: '*'}:*/
                crossDomain: true,
                beforeSend: function () { $("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>'); /*$.mobile.loading('show')*/ },
                complete: function () { $("#results_loading").hide(); /*$.mobile.loading('hide')*/ },
                data: { telecontact: data_send },
                dataType: 'text',
                success: function (response) {
                    var parser = new xml2js.Parser({
                        trim: true,
                        explicitArray: true
                    });
                    parser.parseString(response, function (err, result) {
                        for (var _i = 0, _a = result.search_answers.search_answer; _i < _a.length; _i++) {
                            var answers = _a[_i];
                            console.log('answers d', answers);
                            if (answers.items[0].item) {
                                for (var _b = 0, _c = answers.items; _b < _c.length; _b++) {
                                    var item = _c[_b];
                                    for (var _d = 0, _e = item.item; _d < _e.length; _d++) {
                                        var i = _e[_d];
                                        //for(let i_data of i.item_data){
                                        //console.log(i_data.data[1]._, i_data.data[1].$.name);
                                        yyy.push({ 'title': i.name[0] });
                                        /* for(let data of i_data.data){
                                          
                                           yyy.push({key: data.$.name, value: data._});
                                           
                                         }*/
                                        //}
                                    }
                                }
                            }
                        }
                        resolve(yyy);
                    });
                },
                error: function (error) {
                    console.log(error);
                    reject();
                }
            });
        });
    };
    __decorate([
        ViewChild('searchBox'),
        __metadata("design:type", Object)
    ], JaunesPage.prototype, "searchBox", void 0);
    __decorate([
        ViewChild('searchVil'),
        __metadata("design:type", Object)
    ], JaunesPage.prototype, "searchVil", void 0);
    __decorate([
        ViewChild('searchTel'),
        __metadata("design:type", Object)
    ], JaunesPage.prototype, "searchTel", void 0);
    JaunesPage = __decorate([
        Component({
            selector: 'page-jaunes',
            templateUrl: 'jaunes.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            ElementRef,
            Geolocation,
            Storage])
    ], JaunesPage);
    return JaunesPage;
}());
export { JaunesPage };
//# sourceMappingURL=jaunes.js.map
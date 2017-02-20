import {Injectable} from "@angular/core";

@Injectable()
export class ConfigService {
  private config: any;
  public companyName: any;
  public companyLogo: any;
  public companyFiles: any;
  public companyEmailAddress: any;
  public companyContact: any;
  public companyAddress: any;
  public currency: any;
  public minItemImages: any;
  public payment: any;
  public aboutUs: any;
  public openHours: any;

  constructor() {}

  setConfig(config){
    this.config = config;
    this.companyName = config.get("CompanyName");
    this.companyFiles = config.get("files");
    this.companyLogo = this.companyFiles + "/" + config.get("CompanyLogo");
    this.companyEmailAddress = config.get("CompanyEmailAddress");
    this.companyContact = config.get("CompanyContact");
    this.companyAddress = config.get("CompanyAddress");
    this.currency = config.get("currency");
    this.minItemImages = config.get("MinItemImages");
    this.payment = config.get("Payment");
    this.aboutUs = config.get("CompanyAboutUs");
    this.openHours = config.get("CompanyOpenHours");
  }
}
import { extend } from "lodash";
import { Words } from "./Words";

export class Nulltranslation extends Words {
  constructor() {
    super();
    this.setTranslation("Keine!");
     }
}
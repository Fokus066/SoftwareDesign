import { UI } from "./UI";
import {Admin} from "./classes/Admin";
import {Translator } from "./classes/Translator";

export let ADMIN = new Admin("admin123", "foever");
export let TRANSLATOR= new Translator("translator123", "whoever");

export let worddb : UI = new UI();
worddb.showFunctionalities();


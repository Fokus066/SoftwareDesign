import { Worddatabase } from "./Worddatabase";
import {Admin} from "./classes/Admin";
import {Translator } from "./classes/Translator";

export let ADMIN = new Admin("admin123", "foever");
export let TRANSLATOR= new Translator("translator123", "whoever");

export let worddb : Worddatabase = new Worddatabase();
worddb.showFunctionalities();


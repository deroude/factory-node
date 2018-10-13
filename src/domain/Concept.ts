import { Relation } from "./Relation";
import { Attribute } from "./Attribute";
import { Source } from "./Source";
import { Template } from "./Template";

export const READ: number = 1;
export const EDIT: number = 3;
export const ADD: number = 5;

export class Concept {
    name: string;
    description?: string;
    source?: Source;
    templates?: Template[];
    relations?: Relation[];
    attributes?: Attribute[];
    access: number = READ;
}
import { EDIT } from "./Concept";

export class Attribute {
    name: string;
    description?: string;
    value?: any;
    expression?: string;
    access: number = EDIT;
}
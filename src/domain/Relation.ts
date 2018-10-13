import { Concept, ADD } from "./Concept";

export class Relation {
    name: string;
    description?: string;
    children?: Concept[];
    prototype?: Concept;
    access: number = ADD;
}
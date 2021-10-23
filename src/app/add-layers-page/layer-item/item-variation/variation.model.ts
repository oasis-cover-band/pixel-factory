export class Variation {
    name!: string;
    file!: File;
    size!: number;
    type!: string;
    thumbnail!: string | ArrayBuffer | null; 
    colors!: number[];
}

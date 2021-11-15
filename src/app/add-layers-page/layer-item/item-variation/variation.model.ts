export class Variation {
    name!: string;
    file!: File;
    size!: number;
    type!: string;
    thumbnail!: string | ArrayBuffer | null;
    data!: string | ArrayBuffer | null;  
    variationColors!: number[];
    layerColors!: number[];
    rarity!: number;
}

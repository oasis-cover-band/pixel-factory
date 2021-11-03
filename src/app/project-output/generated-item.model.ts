import { Metadata } from './metadata.model';
import { GeneratedItemLayer } from './generated-item-layer.model';

export class GeneratedItem {
    image0!: string | Blob;
    image1!: string | Blob;
    metadata!: Metadata[];
    json!: string;
    generatedLayers!: GeneratedItemLayer[]
}

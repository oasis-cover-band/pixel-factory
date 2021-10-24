import { Metadata } from './metadata.model';
import { GeneratedItemLayer } from './generated-item-layer.model';

export class GeneratedItem {
    image0!: string;
    image1!: string;
    metadata!: Metadata[];
    generatedLayers!: GeneratedItemLayer[]
}

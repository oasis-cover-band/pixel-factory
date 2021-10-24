import {
  Injectable
} from '@angular/core';
import {
  ProjectService
} from '../project-tools/project.service';
import {
  RarityCompilerService
} from './rarity-compiler.service';
import {
  Metadata
} from '../project-output/metadata.model';
import {
  MetaplexAttribute
} from '../project-output/metaplex-attribute.model';
import {
  MetaplexFile
} from '../project-output/metaplex-file.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private projectService: ProjectService,
    private rarityCompilerService: RarityCompilerService
  ) {}

  async generateMetadata(generatedItemIndex: number) {
    let generatedMetadata;
    await this.getData(generatedItemIndex).then(async (returnedValues: {
      attributes: MetaplexAttribute[],
      category: string,
      files: MetaplexFile[],
      name: string,
      description: string
    }) => {

      generatedMetadata = await this.outputMetadata(generatedItemIndex, returnedValues);
    });
    return await generatedMetadata;
  }

  async outputMetadata(generatedItemIndex: number, returnedValues: {
    attributes: MetaplexAttribute[],
    category: string,
    files: MetaplexFile[],
    name: string,
    description: string
  }): Promise < any > {

    return await JSON.stringify({
      name: returnedValues.name,
      symbol: this.projectService.collectionSymbol,
      description: returnedValues.description,
      seller_fee_basis_points: this.projectService.sellerFeeBasisPoint,
      image: returnedValues.files[0].uri,
      external_url: this.projectService.projectWebsite,
      attributes: returnedValues.attributes,
      collection: {
        name: this.projectService.collectionName,
        family: this.projectService.collectionFamilyName
      },
      properties: {
        files: returnedValues.files,
        category: returnedValues.category,
        creators: this.projectService.creatorShares
      }
    });
  }

  async getData(generatedItemIndex: number): Promise < {
    attributes: MetaplexAttribute[],
    category: string,
    files: MetaplexFile[],
    name: string,
    description: string
  } > {
    return {
      attributes: await this.setAttributes(generatedItemIndex),
      category: await this.setCategory(),
      files: await this.setFiles(generatedItemIndex),
      name: await this.setName(generatedItemIndex),
      description: await this.setDescription(),
    }
  }

  async setFiles(generatedItemIndex: number): Promise < MetaplexFile[] > {
    const files: MetaplexFile[] = await [];
    if (this.projectService.printAsPNG === true) {
      if (this.projectService.storeOnCentralizedServer === true) {
        await files.push({
          uri: this.projectService.centralizedServerLocation + '/' + generatedItemIndex + '.png',
          type: 'image/png'
        });
      } else {
        await files.push({
          uri: generatedItemIndex + '.png',
          type: 'image/png'
        });
      }
    }

    if (this.projectService.printAsSVG === true) {
      if (this.projectService.storeOnCentralizedServer === true) {
        await files.push({
          uri: this.projectService.projectWebsite + '/' + generatedItemIndex + '.svg',
          type: 'unknown'
        });
      } else {
        await files.push({
          uri: generatedItemIndex + '.svg',
          type: 'unknown'
        });
      }
    }
    return await files;
  }

  async setName(generatedItemIndex: number): Promise < string > {
    let name: string;
    if (this.projectService.dynamicItemsName === true) {
      name = 'TODO';
    } else {
      name = await this.projectService.itemsName + ' #' + generatedItemIndex
    }
    return await name;
  }

  async setDescription(): Promise < string > {
    let description: string;
    if (this.projectService.dynamicItemsDescription === true) {
      description = 'TODO';
    } else {
      description = await this.projectService.standardItemsDescription;
    }
    return await description;
  }

  async setCategory(): Promise < string > {
    let category: string;
    if (this.projectService.printAsPNG === true) {
      category = await 'png';
    } else {
      category = await 'unknown';
    }
    return await category;
  }

  async setAttributes(generatedItemIndex: number): Promise < MetaplexAttribute[] > {
    const attributes: MetaplexAttribute[] = await [];
    await this.projectService.generatedItems[generatedItemIndex].metadata.forEach(
      async (metadataItem: Metadata) => {
        await attributes.push({
          trait_type: await metadataItem.layer,
          value: await metadataItem.variation,
          trait_count: await this.rarityCompilerService.collectionStatistics[metadataItem.layer][metadataItem.variation]
        });
      }
    );
    return await attributes;
  }
}

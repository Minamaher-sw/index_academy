/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { PipeTransform, Injectable, ArgumentMetadata, HttpException } from '@nestjs/common';

@Injectable()
export class Menapipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('Menapipe - Value:', value);
    console.log('Menapipe - Metadata:', metadata);
    if(typeof value !== 'string' || value.trim() === '') {
        throw new HttpException('UUID is not correct', 404);
    }
    if(metadata.type === 'param') {
        value = value.trim();
        if(value === '') {
            throw new HttpException('UUID is not correct', 404);
        }
        if(value.length !== 36 || !/^[0-9a-fA-F-]{36}$/.test(value as string)) {
            throw new HttpException('UUID is not correct', 404);
        }
    }
    if (metadata.type === 'body' && typeof value === 'object') {
        for (const key in value) {
            if (typeof value[key] === 'string') {
                value[key] = value[key].trim();
            }
        }
    }
    if(metadata.type === 'query' && typeof value === 'object') {
        for (const key in value) {
            if (typeof value[key] === 'string') {
                value[key] = value[key].trim();
            }
        }
    }

    return value;
  }
}
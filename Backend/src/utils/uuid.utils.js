
import { parse, stringify } from 'uuid';

export function uuidToBuffer(uuid) {
  return Buffer.from(parse(uuid)); // convierte uuid string → Buffer(16)
}

export function bufferToUuid(buffer) { 
  return stringify(buffer); // convierte Buffer(16) → uuid string
}

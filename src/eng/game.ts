import { IGameConfig, getGameConfig, writeGameConfig } from '../func/config';
import { encrypt, decrypt } from './checksum';
import { log } from '../log/std';
import pack from './pack';
import controller from './eng';
import item from './item';

export default function () {
    return getGameConfig();
}
import { GraphNodeDto } from './graph-node.dto';
import { GraphLinkDto } from './graph-link.dto';
import { NetworkPropDto } from '../network-prop.dto';

export interface GraphDto {
  nodes: GraphNodeDto[];
  links: GraphLinkDto[];
  networkProp: NetworkPropDto;
}

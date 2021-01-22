import { Component, Input, OnInit } from '@angular/core';
import { NetworkPropDto } from '../../../../../../shared/model/dto/network-prop.dto';

@Component({
  selector: 'app-network-prop',
  templateUrl: './network-prop.component.html',
  styleUrls: ['./network-prop.component.scss']
})
export class NetworkPropComponent implements OnInit {

  @Input() public networkProp: NetworkPropDto;
  constructor() { }

  ngOnInit(): void {
  }

}

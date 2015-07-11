/**
 * Created by srinath on 6/7/15.
 */
import {inject,All} from 'aurelia-framework';
import  {BaseClient} from './baseClient';

@inject(All.of('APIMethods'))
export class ServiceClient {


  contructor(methods) {
    "use strict";
    methods.forEach(method=> { this[method.name] = method; });
  }



}

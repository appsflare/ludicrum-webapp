/**
 * Created by developer on 6/7/15.
 */
import {inject,All} from 'aurelia-framework';
import  {BaseClient} from './baseClient.js';

@inject(All.of('APIMethods'))
export class ServiceClient {


  contructor(methods) {
    "use strict";
    var me = this;
    methods.forEach(method=> { this[method.name] = method; });
  }



}

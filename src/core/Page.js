import Sender from '../filters/Sender';
import Immutable from 'immutable';

class Page {
  constructor(requestType, protocols, domains, routeId, route) {
    this._requestType = requestType;
    this._protocols = protocols;
    this._domains = domains
    this._routeId = routeId;
    this._route = route;
    this._initDefaultFilters();
  }
  
  _initDefaultFilters() {
    this._requestFilters = [];
    this._responseFilters = [Sender];
  }
  
  getDomain(locale) {
    let domain = this._domains.get(locale);
    if(domain === undefined) {
      throw 'Page: ' + this.name + ' does not have locale: ' + locale;
    }
    return this._protocols[0] + '://' + domain.domain;
  }
  
  getRouteId() {
    return this._routeId;
  }
  
  getRoute() {
    return this._route;
  }
  
  getRequestFilters() {
    return this._requestFilters;
  }
  
  getResponseFilters() {
    return this._responseFilters;
  }
  
  render(req, res, next) {
    next();
  }
  
  send(req, next, body) {
    req.responseBody = body;
    next();
  }
}

export default Page;
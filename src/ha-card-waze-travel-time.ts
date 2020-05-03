import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult
} from "lit-element";

import {
  HomeAssistant
} from "custom-card-helpers" ;

import {CardConfig, Destinations, WazeState} from "./types" ;

import style from './style' ;

console.info("%c WAZE-TRAVEL-TIME-CARD %c 1.0.1 ", "color: white; background: green; font-weight: 700;", "color: coral; background: white; font-weight: 700;");

@customElement("ha-card-waze-travel-time")
class WazeTravelTimeCard extends LitElement {
  private invalidConfig: boolean = false ;
  private invalidDestinations: boolean = false ;
  private invalidUnit: boolean = false ;

  private _header: boolean = false ;
  private _headers: boolean = false ;

  @property() public hass?: HomeAssistant ;

  @property() private _config?: CardConfig ;

  /**
   *
   * @param {CardConfig} config
   */
  public setConfig(config: CardConfig): void {
    console.log( { card_config: config } ) ;

    if (!config) {
      this.invalidConfig = true ;
      throw new Error("Invalid configuration") ;
    }

    if (!config.unit || config.unit.length == 0 || ('km' !== config.unit.toLowerCase() && 'mi' !== config.unit.toLowerCase()) ) {
      this.invalidUnit = true ;
      throw new Error('Unit (km/mi) are required') ;
    }

    if (!config.destinations || config.destinations.length == 0) {
      this.invalidDestinations = true ;
      throw new Error('Destinations are required') ;
    }

    if (config.name && config.name.length > 0) {
      this._header = true ;
    }

    if (config.headers) {
      this._headers = true ;
    }

    this._config = config;
  }

  /**
   * get the current size of the card
   * @return {Number}
   */
  getCardSize() {
    return 1;
  }

  /**
   *
   * @returns {CSSResult}
   */
  static get styles(): CSSResult {
    return style;
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
  render() {
    if ( this.invalidConfig || this.invalidDestinations || this.invalidUnit ) return html`
            <ha-card class="ha-card-waze-travel-time">
                <div class='banner'>
                    <div class="header">ha-card-waze-travel-time</div>
                </div>
                <div class='content'>
                    Configuration ERROR!
                </div>
            </ha-card>
        `;
    else return this._render() ;
  }

  /**
   *
   * @returns {TemplateResult}
   * @private
   */
  _render() {
    let states = this.retrieveEntitiesState( this._config.destinations ) ;
    return html`
      <ha-card class="ha-card-waze-travel-time">
        ${this._header ? html`
          <div class='banner'>
              <div class="header">${this._config.name}</div>
          </div>
        ` : html`` }
          <div class='content'>
              <table class="ha-card-waze">
                ${this._headers ? html`
                <thead>${this._config.columns.map(column => html`<th>${(column || '').toLowerCase()}</th>`)}</thead>
                ` : html`` }
                <tbody>
                ${states ? states.map( state => html`
                  <tr onclick="window.open('https://www.waze.com/ul?navigate=yes&ll=${state.destination.lat}%2C${state.destination.long}&from=${state.origin.lat}%2C${state.origin.long}&at=now');">
                    ${this._config.columns.map(column => html`
                        ${ 'icon' == column ? html`
                        <td><ha-icon icon="${state[ column ]}"></ha-icon></td>
                        ` : html`
                        <td>${state[ column ]}</td>
                        `}
                    `)}
                  </tr>
                `) : ''}               
                </tbody>
              </table>
          </div>
      </ha-card>
    `;
  }

  retrieveEntitiesState( entities: Destinations[] ) {
    const waze_states = entities.map( entity => {
      // console.log( { entity: entity } ) ;
      // @ts-ignore
      let sensor: WazeState = this.hass.states[entity.entity] ;
      // console.log( { sensor: sensor } ) ;

      if(sensor) {
        sensor = ( this._clone( sensor ) ) ;
        sensor.from = entity.from ;
        sensor.to = entity.to || sensor.name ;
        return sensor ;
      } else
        return null ;
      }).filter(Boolean);

    //console.log( { waze_states: waze_states } ) ;

    return waze_states.map(state => {
      let origin_lat: number, origin_long: number, destination_lat: number, destination_long: number ;

      if( state.attributes.origin ) {
        let origin_array = state.attributes.origin.split( ',') ;
        origin_lat = parseFloat( origin_array[ 0 ] ) ;
        origin_long = parseFloat( origin_array[ 1 ] ) ;
      }

      if( state.attributes.destination ) {
        let destination_array = state.attributes.destination.split( ',') ;
        destination_lat = parseFloat( destination_array[ 0 ] ) ;
        destination_long = parseFloat( destination_array[ 1 ] ) ;
      }

      let result =  {
        from: state.from || '',
        to: state.to || '',
        distance: this.computeDistance(state),
        duration: this.computeDuration(state),
        route: state.attributes && state.attributes.route || '',
        icon: state.attributes.icon,
        destination: {
          lat: state.destination ? state.destination.lat : destination_lat,
          long: state.destination ? state.destination.long : destination_long
        },
        origin: {
          lat: origin_lat,
          long: origin_long
        }
      } ;
      // console.log( { result: result } ) ;
      return result ;
    });

  }

  _clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  /**
   * generates the duration for a route
   * @param  {Object} state the card state
   * @return {string} the formatted duration for a ruote
   */
  computeDuration( state: WazeState ) {
    let duration = state.attributes && state.attributes.duration || 0 ;
    let unit_of_measurement = state.attributes && state.attributes.unit_of_measurement || '';
    return "" + Math.round(duration ) + " " + unit_of_measurement;
  }

  /**
   * computes the distance for a route for metric/imperial system
   * @param  {Object} state the card state
   * @return {string} the formatted distance
   */
  computeDistance(state) {
    let distance = state.attributes && state.attributes.distance || 0 ;

    state.to_unit_system = undefined === state.to_unit_system ? this.hass.config.unit_system.length : state.to_unit_system ;

    // if(this.hass.config.unit_system.length !== state.to_unit_system ) {
    //   if( 'km' == state.to_unit_system ) {
    //     distance = distance / 1.60934 ;
    //   } else {
    //     distance = distance * 1.60934 ;
    //   }
    // }

    distance = Number(Math.round(distance * 100) / 100).toFixed(1);
    return "" + distance + " " + this._config.unit ;
  }
}

# HA (Lovelace) Card Waze Travel Time

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

[![License][license-shield]](LICENSE.md)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/r-renato/hass-xiaomi-mi-flora-and-flower-care.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-waze-travel-time/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/r-renato/ha-card-waze-travel-time.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-waze-travel-time/context:javascript)

[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

## Features

* Display multiple Waze routes sensor
* Show distance and duration
* Show best route to take
* Opening the Waze App on route click
* Supports Metric and Imperial systems via HA global settings

## Card Configuration    

Import the card using:

```yaml
resources:
  - url: /community_plugin/ha-card-waze-travel-time/ha-card-waze-travel-time.js
    type: module
```
### Card variables

| **Name**     | **Type**      | **Requirement** | **Default**                       | **Description**                                                                           |
|--------------|---------------|-----------------|-----------------------------------|-------------------------------------------------------------------------------------------|
| type         | string        | **Required**    |                                   | Card type must be `custom:ha-card-waze-travel-time`                                       |
| destinations | object list   | **Required**    |                                   | List of destination objects to display                                                    |
| header       | boolean       | Optional        | `true`                            | Hide/show route columns header                                                            |
| name         | string        | Optional        |                                   | Card name shown on top the routes                                                         |
| columns      | string list   | Optional        | `name, distance, duration, icon`  | Ordered list of columns to display. Valid values: `name, distance, duration, icon, route` |

#### Destination object    

| **Name** | **Type** | **Requirement** | **Description**         |
|----------|----------|-----------------|-------------------------|
| entity   | string   | **Required**    | The waze sensor entitiy |
| name     | string   | **Required**    | The name for the route  |

#### Examples

```yaml
type: custom:card-modder
card:
  type: custom:ha-card-waze-travel-time
  header: false
  name: "Route to..."
  columns:
    - name
    - duration
    - distance
    - icon
  destinations:
    - entity: sensor.waze_home_1_workplace
      name: "1 workplace"
    - entity: sensor.waze_home_2_workplace
      name: "2 workplace"
style:
  background-repeat: no-repeat
  background-color: rgba(50,50,50,0.3)
  background-size: 100% 300px
  border-radius: 20px
  border: solid 1px rgba(100,100,100,0.3)
  box-shadow: 3px 3px rgba(0,0,0,0.4)
```
[license-shield]:https://img.shields.io/github/license/r-renato/hass-xiaomi-mi-flora-and-flower-care
[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow?style=for-the-badge

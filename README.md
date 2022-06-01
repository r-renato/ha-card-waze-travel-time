# HA (Lovelace) Card Waze Travel Time

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

[![License][license-shield]](LICENSE)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/r-renato/ha-card-waze-travel-time.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-waze-travel-time/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/r-renato/ha-card-waze-travel-time.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/ha-card-waze-travel-time/context:javascript)

[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

## Features

* Display multiple Waze routes sensor
* Show distance and duration
* Show best route to take
* Opening the Waze App on route click
* Supports Metric and Imperial systems via HA global settings

<p float="left">
<img src="https://gitlab.com/rrenato/ha-card-waze-travel-time/raw/master/md.images/ha-card-waze-travel-time.png" width="40%" height="auto" alt="Home Assistant lovelace card">
</p>  

## Card Configuration    

Import the card using:

```yaml
resources:
  - url: /hacsfiles/ha-card-waze-travel-time/ha-card-waze-travel-time.js
    type: module
```
Optionally, you can use the following plugin to change the card colors:

```yaml
resources:
  - url: /hacsfiles/lovelace-card-mod/card-mod.js
    type: module
```
### Card variables

| **Name**     | **Type**      | **Requirement** | **Default**                       | **Description**                                                                               |
|--------------|---------------|-----------------|-----------------------------------|-----------------------------------------------------------------------------------------------|
| type         | string        | **Required**    |                                   | Card type must be `custom:ha-card-waze-travel-time`                                           |
| header       | boolean       | Optional        | `true`                            | Hide/show route columns header                                                                |
| name         | string        | Optional        |                                   | Card name shown on top the routes                                                             |
| unit         | string        | **Required**    |                                   | It can assume the values: `km`/`mi`
| columns      | string list   | Optional        | `to, distance, duration, icon`    | Ordered list of columns to display. Valid values: `from, to, distance, duration, icon, route` |
| destinations | object list   | **Required**    |                                   | List of destination objects to display                                                        |

#### Destination object    

| **Name** | **Type** | **Requirement** | **Description**         |
|----------|----------|-----------------|-------------------------|
| entity   | string   | **Required**    | The waze sensor entitiy |
| from     | string   | Optional        | Route from              |
| to       | string   | **Required**    | Route destination name  |

#### Examples

```yaml
type: custom:mod-card
card:
  type: custom:ha-card-waze-travel-time
  header: false
  name: "Route to..."
  unit: km
  columns:
    - from
    - to
    - duration
    - distance
    - icon
  destinations:
    - entity: sensor.waze_home_1_workplace
      from: "Place 1"
      to: "Place 2"
    - entity: sensor.waze_home_2_workplace
      to: "Place 3"
style: |
  ha-card {
    --primary-text-color: #FFFFFF;
    --secondary-text-color: #727272;
    --text-primary-color: #ffffff;
    --disabled-text-color: #bdbdbd;
    background-image: url("/local/imgs/card_back.png") ;
    background-repeat: no-repeat ;
    background-color: rgba(50,50,50,0.3) ;
    background-size: 100% 300px ;
    border-radius: 20px ;
    border: solid 1px rgba(100,100,100,0.3) ;
    box-shadow: 3px 3px rgba(0,0,0,0.4) ;
  }
```

[license-shield]:https://img.shields.io/github/license/r-renato/hass-xiaomi-mi-flora-and-flower-care
[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow?style=for-the-badge

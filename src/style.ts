import { css } from 'lit-element';

const style = css`
    ha-card {
        padding: 24px 16px 16px 16px;
    }
    
    .banner {
        display: flex;
        align-items: flex-end;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        padding-top: 12px;
        
        background-color: rgba(50,50,50,0.75);
        border-radius: 3px;
    }
    
    .has-plant-image .banner {
        padding-top: 30%;
    }
    
    .header {
        @apply --paper-font-headline;
        line-height: 40px;
        padding: 8px 16px;
        font-weight: 500;
        font-size: 125%;
    }
    
    .has-plant-image .header {
        font-size: 16px;
        font-weight: 500;
        line-height: 16px;
        padding: 16px;
        color: white;
        width: 100%;
        background: rgba(0, 0, 0, var(--dark-secondary-opacity));
    }
  
    table {
        width: 100%;
    } 
      .ha-card-waze h3, h3 { padding-left: 10px ; padding-right: 10px ; margin-bottom: 0 ; color: white ; }
      .ha-card-waze table { width: 100%; }
      .ha-card-waze tr:nth-of-type(odd) { /*background: #eee; */ }
      .ha-card-waze th { /*background: #3498db;*/ color: white; font-weight: bold; }
      .ha-card-waze td { padding-left: 10px ; padding-right: 10px ; color: white ; text-align: left; }
      .ha-card-waze th { padding-left: 10px ; padding-right: 10px ; color: white ; text-align: left; }
`;

export default style;
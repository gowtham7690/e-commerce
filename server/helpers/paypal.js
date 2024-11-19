const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AeBb26Uro3m_Ba8kklcTizzMfLic9TIPc_v2EZcztTIiCLD8n0-8UBTuDExmzcu_hixhFC2EFGEOH1YR',
    client_secret: 'EDDaUeSIXGqSF1Gz0uISnU0TEVx3NX0gq1BejM9gLxsaosSIyAwCc_hxPX2M6z6lDvyIbMojizs1S95v'
});

module.exports = paypal;

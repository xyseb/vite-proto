'use strict';
/*
 * STYLELINT Configuration file
 */

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-hudochenkov/order"
  ],
  plugins: [
    "stylelint-no-unsupported-browser-features"
  ],
  rules: {
    "rule-empty-line-before": null,
    "plugin/no-unsupported-browser-features": [true, {
      "severity": "warning",
      "ignorePartialSupport": false
    }]
  }
}
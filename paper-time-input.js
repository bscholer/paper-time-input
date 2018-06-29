import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `paper-time-input`
 * Polymer element to enable users to input 12 and 24 hour times.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaperTimeInput extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'paper-time-input',
      },
    };
  }
}

window.customElements.define('paper-time-input', PaperTimeInput);

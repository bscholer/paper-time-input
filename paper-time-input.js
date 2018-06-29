import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

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
        @apply --paper-font-common-base;
      }
      paper-input{
        width: 30px;
        text-align: center;
        --paper-input-container-input: {
          /* Damn you firefox
          * Needed to hide spin num in firefox
          * http://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box
          */
          -moz-appearance: textfield;
          @apply --paper-time-input-cotnainer;
        };
        --paper-input-container-input-webkit-spinner: {
          -webkit-appearance: none;
          margin: 0;
          display: none;
        };
      }
      paper-dropdown-menu{
        width: 55px;
        padding: 0;
        /* Force ripple to use the whole container */
        --paper-dropdown-menu-ripple: {
          color: var(--paper-time-input-dropdown-ripple-color, --primary-color);
        };
        --paper-input-container-input: {
          @apply --paper-font-button;
          text-align: center;
          padding-left: 5px;
          @apply --paper-time-dropdown-input-cotnainer;
        };
        --paper-input-container-underline: {
          border-color: transparent;
        }
        --paper-input-container-underline-focus: {
          border-color: transparent;
        };
      }
      paper-item{
        cursor: pointer;
        text-align: center;
        font-size: 14px;
      }
      paper-listbox{
        padding: 0;
      }
      label{
        @apply --paper-font-caption;
      }
      label[disabled] {
        color: #9b9b9b;
         /* @apply --paper-time-input-cotnainer-disabled; */
       }
      .time-input-wrap{
        @apply --layout-horizontal;
        @apply --layout-no-wrap;
      }
      [hidden]{
        display: none !important;
      }
    </style>

    <label hidden$="[[hideLabel]]">[[label]]</label>
    <div class="time-input-wrap">

      <!-- Hour Input -->
      <paper-input
        id="hour"
        value="{{hour}}"
        on-change="_shouldFormatHour"
        required
        auto-validate="[[autoValidate]]"
        prevent-invalid-input
        maxlength="2"
        max="[[_computeHourMax(format)]]"
        min="0"
        no-label-float
        disabled="[[disabled]]">
        <span suffix slot="suffix">:</span>
      </paper-input>

      <!-- Min Input -->
      <paper-input
        id="min"
        value="{{min}}"
        on-change="_formatMin"
        required
        auto-validate="[[autoValidate]]"
        prevent-invalid-input
        maxlength="2"
        max="59"
        min="0"
        no-label-float
        disabled="[[disabled]]">
      </paper-input>

      <!-- Dropdown Menu -->
      <paper-dropdown-menu
        id="dropdown"
        required
        hidden$="[[_equal(format, '24')]]"
        no-label-float
        disabled="[[disabled]]">

        <paper-listbox attr-for-selected="name" selected="{{amPm}}" slot="dropdown-content">
          <paper-item name="AM">AM</paper-item>
          <paper-item name="PM">PM</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

    </div>
    `;
    }

    static get properties() {
        return {
            /**
             * Label for the input
             */
            label: {
                type: String,
                value: 'Time'
            },
            /**
             * auto validate time inputs
             */
            autoValidate: {
                type: Boolean,
                value: true
            },
            /**
             * hides the label
             */
            hideLabel: {
                type: Boolean,
                value: false
            },
            /**
             * 12 or 24 hr format
             */
            format: {
                type: Number,
                value: 12
            },
            /**
             * disables the inputs
             */
            disabled: {
                type: Boolean,
                value: false
            },
            /**
             * hour
             */
            hour: {
                type: String,
                notify: true
            },
            /**
             * minute
             */
            min: {
                type: String,
                notify: true
            },
            /**
             * AM or PM
             */
            amPm: {
                type: String,
                notify: true,
                value: 'AM'
            },
            /**
             * Formatted time string
             */
            value: {
                type: String,
                notify: true,
                readOnly: true,
                computed: '_computeTime(min, hour, amPm)'
            }
        };
    }

    constructor() {
        super();
    }

    /**
     * Validate the inputs
     * @return {boolean}
     */
    validate() {
        var valid = true;
        // Validate hour & min fields
        if (!this.$.hour.validate() | !this.$.min.validate()) {
            valid = false;
        }
        // Validate AM PM if 12 hour time
        if (this.format == 12 && !this.$.dropdown.validate()) {
            valid = false;
        }
        return valid;
    }

    /**
     * Create time string
     */
    _computeTime(min, hour, amPm) {
        if (hour && min) {
            // No ampm on 24 hr time
            if (this.format == 24) {
                amPm = "";
            }
            return hour + ":" + min + " " + amPm;
        }
    }

    /**
     * Format min
     */
    _formatMin() {
        if (this.min.toString().length === 1) {
            this.min = (this.min < 10) ? ("0" + this.min) : this.min;
        }
    }

    /**
     * Hour needs a leading zero in 24hr format
     */
    _shouldFormatHour() {
        if (this.format == 24 && this.hour.toString().length === 1) {
            this.hour = (this.hour < 10) ? ("0" + this.hour) : this.hour;
        }
    }

    /**
     * 24 hour format has a max hr of 23
     */
    _computeHourMax(format) {
        if (format == 12) {
            return format
        } else {
            return 23
        }
    }

    _equal(n1, n2) {
        if (n1 == n2) {
            return true
        }
    }
}

window.customElements.define('paper-time-input', PaperTimeInput);

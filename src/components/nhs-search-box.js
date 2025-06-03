import { LitElement, css, html } from 'lit'
import { ai, back, mic, search } from '../shared/icons.js'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      placeholder: { type: String },
      buttonText: { type: String, attribute: 'button-text' },
      isAiSearch: { type: Boolean },
      
    }
  }

  static get styles() {
    return css`
      .icon-prefix {
          position: absolute;
          left: 5px;
          top: 55%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: 14px;
          color: #888;
      }
      .icon-prefix-top {
          position: absolute;
          right: 10px;
          top: 20px;
          font-size: 14px;
          color: #888;          
          cursor: pointer;
      }
      .icon-sufix {
          position: absolute;
          right: 5px;
          top: 25%;
          cursor: pointer;
          font-size: 14px;
      }
      .icon-sufix-bottom {
          position: absolute;
          right: 5px;
          bottom: 10px;
          cursor: pointer;
          font-size: 14px;
      }      
      .icon-prefix svg { 
        fill: #888
      }
      .input-normal-wrapper {
          position: relative;
          display: inline-block;
      }

      .input-ai-wrapper {
          position: relative;
          display: inline-block;
      }

      .search-form {
          display: flex;
          flex-direction: column; 
          gap: 15px; 
      }
      .search-input {
          width: 87%;
          padding: 14px 18px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 1rem;
          padding-left: 30px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .search-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: none;
      }   

      .search-button {
          background-color: #a7d5d9; 
          color: #1e1d21;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          font-size: .875rem;
          height: 2.5rem;
          line-height: 1.125rem;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
      }

      .search-button:hover {
          background-color: #0056b3;
      }
      .search-button:active {
          transform: scale(0.98);
      }
      @media (max-width: 992px) { 
        .search-input {
          width: 91%;
        }
      }
    `
  }

  constructor() {
    super()
    this.docsHint = 'Click on the Vite and Lit logos to learn more'
    this.count = 0
  }

  render() {
    return html`
      <div class="search-form">
        ${!this.isAiSearch?
            html`<div class="input-normal-wrapper">
              <span class="icon-prefix">${search}</span>
              <input id="nhs-search-normal-text-box" type="text" placeholder="${this.placeholder}" class="search-input">
              <span class="icon-sufix" title="Smart AI search" @click=${this.toggleSmartSearch}>${ai}</span>
            </div>` :
            html`<div class="input-ai-wrapper">
              <span class="icon-prefix-top" @click=${this.toggleNormalSearch}>${back}</span>
              <textarea id="nhs-search-ai-text-box" rows="4" type="text" placeholder="${this.placeholder}" class="search-input"></textarea>
              <span class="icon-sufix-bottom" title="Search with voice" @click=${this.toggleSmartSearch}>${mic}</span>
            </div>`}
        <button class="search-button" @click=${this.onClick}>${this.buttonText}</button>
      </div>`;
  }

  firstUpdated() {
    this.updateComplete.then(() => {
        requestAnimationFrame(() => {
          const el = this.shadowRoot.querySelector('#nhs-search-normal-text-box');
          el?.focus();
        });
      });
  }
  
  toggleNormalSearch() {
    this.isAiSearch = false;
  }

  toggleSmartSearch() {
    this.isAiSearch = true;
  }

  onClick() {
    this.count++
  }
}

window.customElements.define('nhs-search-box', MyElement)

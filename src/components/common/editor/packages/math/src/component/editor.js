import {$, DATA_ELEMENT, isHotkey, isMobile, Tooltip, TRIGGER_CARD_ID, UI} from '@aomao/engine';

/*export type Options = {
  tips?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onOk?: (event: Event) => void;
  onDestroy?: () => void;
};*/

import { getLocales } from '../utils';

class MathEditor {
  editor;
  options;
  container;

  constructor(editor, options) {
    this.editor = editor;
    this.options = options;
  }

  focus() {
    this.container?.find('textarea').get()?.focus();
  }

  render(cardId, defaultValue) {
    this.destroy();

    this.container = $(
      `<div class="data-card-math-editor${
        isMobile ? ' data-card-math-editor-mobile' : ''
      }" ${DATA_ELEMENT}="${UI}" ${TRIGGER_CARD_ID}="${cardId}"></div>`
    );

    const locales = getLocales(this.editor);
    const {onBlur, onFocus, onChange, onOk, tips} = this.options;
    const textarea = $(`<textarea>${defaultValue || ''}</textarea>`);

    textarea.on('focus', () => {
      if (onFocus) onFocus();
    });

    textarea.on('blur', () => {
      if (onBlur) onBlur();
    });

    textarea.on('input', (event) => {
      if (onChange) onChange((event.target).value);
    });

    textarea.on('mousedown', () => {
      textarea.get()?.focus();
    });

    textarea.on('keydown', (event) => {
      if (onOk && isHotkey('mod+enter', event)) {
        onOk(event);
      }
    });

    this.container.append(textarea);
    const toolbar = $(`<div class="data-math-editor-toolbar"></div>`);
    if (tips) {
      toolbar.append($(`<div class="data-math-editor-toolbar-tips">${tips}</div>`));
    }

    const buttonContainer = $(
      `<div class="data-math-editor-toolbar-button"><a class="data-embed-toolbar-btn">${locales.ok}</div>`
    );
    const button = buttonContainer.find('a');
    button.on('mouseenter', () => {
      Tooltip.show(button, locales.buttonTips);
    });
    button.on('mouseleave', () => {
      Tooltip.hide();
    });
    button.on('mousedown', () => {
      Tooltip.hide();
    });
    if (onOk) button.on('click', onOk);
    toolbar.append(buttonContainer);
    this.container.append(toolbar);
    return this.container;
  }

  destroy() {
    this.container?.remove();
    const onDestroy = this.options?.onDestroy;
    if (onDestroy) onDestroy();
  }
}

export default MathEditor;

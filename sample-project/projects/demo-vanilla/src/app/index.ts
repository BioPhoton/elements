import {
  DynamicFormWebComponent,
  MatWebComponent,
  WebComponent
} from '../../../../dist/elements-angular-styled/main-es2015';

export function init(): void {
  console.log('INIT');

  const webComponent: WebComponent = document.getElementsByTagName('web-component')[0];
  const matWebComponent: MatWebComponent = document.getElementsByTagName('mat-web-component')[0];
  const dynamicFormComponent: DynamicFormWebComponent = document.getElementsByTagName('dynamic-form-component')[0];

// Inputs
  const btnSetAttribute = document.getElementById('setAttribute');
  btnSetAttribute.addEventListener('click', () => {
    setAttribute();
  });

  const btnSetProperty = document.getElementById('setProperty');
  btnSetProperty.addEventListener('click', () => {
    setProperty();
  });

  dynamicFormComponent.formModel = getJsonModel();

// Outputs

  webComponent.addEventListener('update', (customEvent) => {
    render(customEvent.detail);
  });

  matWebComponent.addEventListener('event', (customEvent) => {
    render(customEvent.detail.target.value);
  });

  dynamicFormComponent.addEventListener('change', (customEvent) => {
    console.log('change', customEvent);
    render(customEvent.detail.group.value);
  });

// === Helper

  function setAttribute() {
    webComponent.setAttribute('value', 'setAttribute' + Math.random());
    matWebComponent.setAttribute('value', 'setAttribute' + Math.random());
  }


  function setProperty() {
    webComponent.value = 'setProperty' + Math.random();
    matWebComponent.value = 'setProperty' + Math.random();
  }

  function render(customEvent) {
    const viewUpdate = document.getElementById('update');
    viewUpdate.innerHTML = JSON.stringify(customEvent);
  }

  function getJsonModel() {
    return [
      {
        "type": "INPUT",
        "id": "sampleInput",
        "label": "Sample Input",
        "maxLength": 42,
        "placeholder": "Sample input"
      },
      {
        "type": "RADIO_GROUP",
        "id": "sampleRadioGroup",
        "label": "Sample Radio Group",
        "options": [
          {
            "label": "Option 1",
            "value": "option-1",
          },
          {
            "label": "Option 2",
            "value": "option-2"
          },
          {
            "label": "Option 3",
            "value": "option-3"
          }
        ],
        "value": "option-3"
      },
      {
        "type": "CHECKBOX",
        "id": "sampleCheckbox",
        "label": "I do agree"
      }
    ];
  };

}

export const multiFormOptions = [
  [],
  [
    {
      asyncValidators: null,
      errorMessages: {
        customDateRangeValidator: 'Invalid period of time selected'
      },
      hidden: false,
      id: 'stay',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'stay',
      relations: [],
      updateOn: null,
      disabled: false,
      group: [
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'arrivalDate',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'arrivalDate',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: null,
          required: false,
          tabIndex: null,
          value: null,
          format: null,
          max: null,
          min: null,
          placeholder: 'Date of Arrival',
          type: 'DATEPICKER',
          autoFocus: false,
          focusedDate: null,
          inline: false,
          prefix: null,
          readOnly: false,
          toggleIcon: null,
          toggleLabel: null,
          suffix: null
        },
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'departureDate',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'departureDate',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: null,
          required: false,
          tabIndex: null,
          value: null,
          format: null,
          max: null,
          min: null,
          placeholder: 'Date of Departure',
          type: 'DATEPICKER',
          autoFocus: false,
          focusedDate: null,
          inline: false,
          prefix: null,
          readOnly: false,
          toggleIcon: null,
          toggleLabel: null,
          suffix: null
        }
      ],
      type: 'GROUP',
      legend: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'room',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'room',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      group: [
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'roomSize',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'roomSize',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: 'Choose a room type',
          required: false,
          tabIndex: null,
          value: null,
          options: [
            {
              disabled: false,
              label: 'Single Room',
              value: 'single-room'
            },
            {
              disabled: false,
              label: 'Double Room',
              value: 'double-room'
            },
            {
              disabled: false,
              label: 'Business Suite',
              value: 'business-suite'
            },
            {
              disabled: false,
              label: 'Presidential Suite',
              value: 'presidential-suite'
            },
            {
              disabled: false,
              label: 'Storeroom',
              value: 'storeroom'
            }
          ],
          type: 'SELECT',
          filterable: false,
          multiple: false,
          placeholder: 'Room Size',
          prefix: null,
          suffix: null
        },
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'roomQuantity',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'roomQuantity',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: 'Maximum: 5',
          required: false,
          tabIndex: null,
          value: null,
          autoComplete: 'on',
          autoFocus: false,
          maxLength: null,
          minLength: null,
          placeholder: 'Room Quantity',
          prefix: null,
          readOnly: false,
          spellCheck: false,
          suffix: null,
          list: null,
          type: 'INPUT',
          accept: null,
          inputType: 'number',
          mask: null,
          max: 5,
          min: 0,
          multiple: null,
          pattern: null,
          step: null
        }
      ],
      type: 'GROUP',
      legend: null
    },
    {
      asyncValidators: null,
      errorMessages: {
        required: 'Field is required'
      },
      hidden: false,
      id: 'firstName',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'firstName',
      relations: [],
      updateOn: null,
      validators: {
        required: null
      },
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: null,
      autoComplete: 'on',
      autoFocus: false,
      maxLength: 25,
      minLength: null,
      placeholder: 'First Name',
      prefix: null,
      readOnly: false,
      spellCheck: false,
      suffix: null,
      list: null,
      type: 'INPUT',
      accept: null,
      inputType: 'text',
      mask: null,
      max: null,
      min: null,
      multiple: null,
      pattern: null,
      step: null
    },
    {
      asyncValidators: null,
      errorMessages: {
        required: 'Field is required'
      },
      hidden: false,
      id: 'lastName',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'lastName',
      relations: [],
      updateOn: null,
      validators: {
        required: null
      },
      disabled: false,
      additional: {
        color: 'accent'
      },
      hint: null,
      required: false,
      tabIndex: null,
      value: null,
      autoComplete: 'on',
      autoFocus: false,
      maxLength: 50,
      minLength: null,
      placeholder: 'Last Name',
      prefix: null,
      readOnly: false,
      spellCheck: false,
      suffix: null,
      list: null,
      type: 'INPUT',
      accept: null,
      inputType: 'text',
      mask: null,
      max: null,
      min: null,
      multiple: null,
      pattern: null,
      step: null
    },
    {
      asyncValidators: null,
      errorMessages: {
        email: 'Field has no valid email'
      },
      hidden: false,
      id: 'email',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'email',
      relations: [],
      updateOn: null,
      validators: {
        email: null
      },
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: null,
      autoComplete: 'on',
      autoFocus: false,
      maxLength: null,
      minLength: null,
      placeholder: 'E-Mail',
      prefix: null,
      readOnly: false,
      spellCheck: false,
      suffix: null,
      list: null,
      type: 'INPUT',
      accept: null,
      inputType: 'text',
      mask: null,
      max: null,
      min: null,
      multiple: null,
      pattern: null,
      step: null
    },
    {
      asyncValidators: null,
      errorMessages: {
        required: 'Field is required'
      },
      hidden: false,
      id: 'phone',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'phone',
      relations: [],
      updateOn: null,
      validators: {
        required: null
      },
      disabled: false,
      additional: null,
      hint: 'Add your country code first',
      required: false,
      tabIndex: null,
      value: null,
      autoComplete: 'on',
      autoFocus: false,
      maxLength: null,
      minLength: null,
      placeholder: 'Phone Number',
      prefix: '+',
      readOnly: false,
      spellCheck: false,
      suffix: null,
      list: null,
      type: 'INPUT',
      accept: null,
      inputType: 'tel',
      mask: null,
      max: null,
      min: null,
      multiple: null,
      pattern: null,
      step: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'addressStreet',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'addressStreet',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      group: [
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'streetName',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'streetName',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: null,
          required: false,
          tabIndex: null,
          value: null,
          autoComplete: 'on',
          autoFocus: false,
          maxLength: null,
          minLength: null,
          placeholder: 'Street Name',
          prefix: null,
          readOnly: false,
          spellCheck: false,
          suffix: null,
          list: null,
          type: 'INPUT',
          accept: null,
          inputType: 'text',
          mask: null,
          max: null,
          min: null,
          multiple: null,
          pattern: null,
          step: null
        },
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'streetNumber',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'streetNumber',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: null,
          required: false,
          tabIndex: null,
          value: null,
          autoComplete: 'on',
          autoFocus: false,
          maxLength: null,
          minLength: null,
          placeholder: 'Street Number',
          prefix: null,
          readOnly: false,
          spellCheck: false,
          suffix: null,
          list: null,
          type: 'INPUT',
          accept: null,
          inputType: 'text',
          mask: null,
          max: null,
          min: null,
          multiple: null,
          pattern: null,
          step: null
        }
      ],
      type: 'GROUP',
      legend: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'addressLocation',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'addressLocation',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      group: [
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'zipCode',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'zipCode',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: null,
          required: false,
          tabIndex: null,
          value: null,
          autoComplete: 'on',
          autoFocus: false,
          maxLength: null,
          minLength: null,
          placeholder: 'ZIP',
          prefix: null,
          readOnly: false,
          spellCheck: false,
          suffix: null,
          list: null,
          type: 'INPUT',
          accept: null,
          inputType: 'text',
          mask: null,
          max: null,
          min: null,
          multiple: null,
          pattern: null,
          step: null
        },
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'state',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'state',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: 'Autocomplete',
          required: false,
          tabIndex: null,
          value: null,
          autoComplete: 'on',
          autoFocus: false,
          maxLength: null,
          minLength: null,
          placeholder: 'State',
          prefix: null,
          readOnly: false,
          spellCheck: false,
          suffix: null,
          list: null,
          type: 'INPUT',
          accept: null,
          inputType: 'text',
          mask: null,
          max: null,
          min: null,
          multiple: null,
          pattern: null,
          step: null
        },
        {
          asyncValidators: null,
          errorMessages: null,
          hidden: false,
          id: 'city',
          label: null,
          labelTooltip: null,
          controlTooltip: null,
          layout: null,
          name: 'city',
          relations: [],
          updateOn: null,
          validators: null,
          disabled: false,
          additional: null,
          hint: null,
          required: false,
          tabIndex: null,
          value: null,
          autoComplete: 'on',
          autoFocus: false,
          maxLength: null,
          minLength: null,
          placeholder: 'City',
          prefix: null,
          readOnly: false,
          spellCheck: false,
          suffix: null,
          list: null,
          type: 'INPUT',
          accept: null,
          inputType: 'text',
          mask: null,
          max: null,
          min: null,
          multiple: null,
          pattern: null,
          step: null
        }
      ],
      type: 'GROUP',
      legend: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'extras',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'extras',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: null,
      options: [
        {
          disabled: false,
          label: 'Breakfast',
          value: 'extraBreakfast'
        },
        {
          disabled: false,
          label: 'TV',
          value: 'extraTV'
        },
        {
          disabled: false,
          label: 'WiFi',
          value: 'extraWiFi'
        },
        {
          disabled: false,
          label: 'Parking Lot',
          value: 'extraParking'
        },
        {
          disabled: false,
          label: 'Balcony',
          value: 'extraBalcony'
        }
      ],
      type: 'SELECT',
      filterable: false,
      multiple: true,
      placeholder: 'Extras',
      prefix: null,
      suffix: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'payment',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'payment',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: 'cc',
      options: [
        {
          disabled: false,
          label: 'Credit Card',
          value: 'cc'
        },
        {
          disabled: false,
          label: 'PayPal',
          value: 'paypal'
        },
        {
          disabled: false,
          label: 'Cash',
          value: 'cash'
        },
        {
          disabled: false,
          label: 'Bitcoin',
          value: 'bitcoin'
        }
      ],
      type: 'RADIO_GROUP',
      legend: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'note',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'note',
      /*relations: [
        {
          match: 'DISABLED',
          when: [
            {
              id: 'payment',
              value: 'bitcoin'
            }
          ]
        },
        {
          match: 'REQUIRED',
          when: [
            {
              id: 'payment',
              value: 'paypal'
            }
          ]
        }
      ],*/
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: null,
      autoComplete: 'on',
      autoFocus: false,
      maxLength: null,
      minLength: null,
      placeholder: 'Personal Note',
      prefix: null,
      readOnly: false,
      spellCheck: false,
      suffix: null,
      type: 'TEXTAREA',
      cols: 20,
      rows: 3,
      wrap: 'soft'
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'tags',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'tags',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: ['hotel', 'booking'],
      autoComplete: 'on',
      autoFocus: false,
      maxLength: null,
      minLength: null,
      placeholder: 'Tags',
      prefix: null,
      readOnly: false,
      spellCheck: false,
      suffix: null,
      list: null,
      type: 'INPUT',
      accept: null,
      inputType: 'text',
      mask: null,
      max: null,
      min: null,
      multiple: true,
      pattern: null,
      step: null
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'reminder',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'reminder',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: false,
      labelPosition: null,
      type: 'SWITCH',
      offLabel: 'Send me a reminder',
      onLabel: 'Send me a reminder'
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'newsletter',
      label: null,
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'newsletter',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: true,
      labelPosition: null,
      type: 'SWITCH',
      offLabel: 'Subscribe to newsletter',
      onLabel: 'Subscribe to newsletter'
    },
    {
      asyncValidators: null,
      errorMessages: null,
      hidden: false,
      id: 'confirm',
      label: 'I confirm the information given above',
      labelTooltip: null,
      controlTooltip: null,
      layout: null,
      name: 'confirm',
      relations: [],
      updateOn: null,
      validators: null,
      disabled: false,
      additional: null,
      hint: null,
      required: false,
      tabIndex: null,
      value: false,
      labelPosition: null,
      type: 'CHECKBOX',
      indeterminate: false
    }
  ],
  [
    {
      id: 'firstName',
      name: 'firstName',
      label: 'firstName',
      type: 'INPUT',
      inputType: 'text'
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'lastName',
      type: 'INPUT',
      inputType: 'text'
    },
    {
      id: 'email',
      name: 'Email',
      label: 'Email',
      type: 'INPUT',
      inputType: 'email'
    }
  ],
  [
    {
      id: 'firstName',
      name: 'firstName',
      label: 'firstName',
      type: 'INPUT',
      inputType: 'text'
    },
    {
      id: 'lastName',
      name: 'lastName',
      label: 'lastName',
      type: 'INPUT',
      inputType: 'text'
    },
    {
      id: 'birthdate',
      name: 'Birthdate',
      label: 'Birthdate',
      type: 'INPUT',
      inputType: 'text'
    }
  ]
];

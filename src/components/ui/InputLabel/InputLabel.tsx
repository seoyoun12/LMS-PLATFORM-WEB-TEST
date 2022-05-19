import { forwardRef } from 'react';
import { InputLabel, InputLabelProps } from '@mui/material';
import * as React from 'react';

export const CustomInputLabel = forwardRef<HTMLLabelElement, InputLabelProps & { size: 'small' | 'medium' }>((
    props
    , ref
  ) => <InputLabel {...props} ref={ref} />
);

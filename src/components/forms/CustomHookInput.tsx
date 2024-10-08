import { Controller, useFormContext } from 'react-hook-form';

// mui
import { SxProps, TextField } from '@mui/material';

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

const CustomHookInput = ({
  name,
  label,
  type = 'text',
  size = 'small',
  fullWidth = true,
  sx,
  disabled = false,
  required = false
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          disabled={disabled}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default CustomHookInput;

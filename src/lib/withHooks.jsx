import React from 'react';
import { useForm } from 'react-hook-form';

export function withFormHook(Component) {
    return function WrappedComponent(props) {
      const formHook = useForm();
      return <Component {...props} form={formHook} />;
    }
}

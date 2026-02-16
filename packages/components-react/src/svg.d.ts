declare module '*.svg?react' {
  import React from 'react';
  const Component: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
  >;
  export default Component;
}

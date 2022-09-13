import dynamic from 'next/dynamic';
import * as React from 'react';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { TuiEditorWithForwardedProps } from './EditorWrapper';
interface EditorPropsWithHandlers extends EditorProps {
  onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./EditorWrapperColorSyntax'),
  {
    ssr: false,
  }
);

const TuiEditorColorSyntax = React.forwardRef<
  EditorType | undefined,
  EditorPropsWithHandlers
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

TuiEditorColorSyntax.displayName = 'TuiEditorColorSyntax';

export default TuiEditorColorSyntax;

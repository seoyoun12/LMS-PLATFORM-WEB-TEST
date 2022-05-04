import { EditorProps, Viewer } from '@toast-ui/react-editor';
import * as React from 'react';

export interface TuiViewerWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Viewer>;
}

export default (props: TuiViewerWithForwardedProps) => (
  <Viewer {...props} ref={props.forwardedRef} />
);

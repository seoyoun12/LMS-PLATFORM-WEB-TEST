import dynamic from 'next/dynamic';
import * as React from 'react';
import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';
import { TuiViewerWithForwardedProps } from '@components/common/TuiEditor/ViewerWrapper';
import '@toast-ui/editor/dist/toastui-editor.css';

interface ViewerPropsWithHandlers extends ViewerProps {
  onChange?(value: string): void;
}

const Viewer = dynamic<TuiViewerWithForwardedProps>(() => import('./ViewerWrapper'), { ssr: false });

export const TuiViewer = React.forwardRef<ViewerType | undefined, ViewerPropsWithHandlers>((props, ref) => (
  <Viewer {...props} forwardedRef={ref as React.MutableRefObject<ViewerType>}/>
));

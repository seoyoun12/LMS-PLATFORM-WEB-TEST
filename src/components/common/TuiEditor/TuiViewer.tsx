import dynamic from 'next/dynamic';
import { Viewer as ViewerType, ViewerProps } from '@toast-ui/react-editor';
import { TuiViewerWithForwardedProps } from '@components/common/TuiEditor/ViewerWrapper';
import '@toast-ui/editor/dist/toastui-editor.css';
import { forwardRef } from 'react';

interface ViewerPropsWithHandlers extends ViewerProps {
  onChange?(value: string): void;
}

const Viewer = dynamic<TuiViewerWithForwardedProps>(() => import('./ViewerWrapper'), { ssr: false });

export const TuiViewer = forwardRef<ViewerType | undefined, ViewerPropsWithHandlers>((props, ref) => (
  <Viewer {...props} forwardedRef={ref as React.MutableRefObject<ViewerType>} />
));
TuiViewer.displayName = 'TuiViewer';
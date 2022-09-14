import React from 'react';
import { Editor, EditorProps } from '@toast-ui/react-editor';
//colorSyntax Plugin
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import type { PluginContext, PluginInfo } from '@toast-ui/editor';
// import {PluginOptions} from '@toast-ui/editor-plugin-color-syntax/types'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

export interface TuiEditorWithForwardedProps extends EditorProps {
  forwardedRef?: React.MutableRefObject<Editor>;
}

const EditorWrapper = (props: TuiEditorWithForwardedProps) => (
  <Editor {...props} ref={props.forwardedRef} plugins={[colorSyntax]} />
);

export default EditorWrapper;

import { CraftEditor } from '@sergeysova/craft';

type RichTextEditorProps = {
  value: string;
  onChange: ({ Editor }: any) => any;
};

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <CraftEditor
      onUpdate={(editor) => onChange(editor?.getHTML())}
      value={value}
    />
  );
}

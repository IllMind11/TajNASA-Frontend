import { CraftEditor } from '@sergeysova/craft';
import { generateJSON } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

type RichTextEditorProps = {
  value: string;
  onChange: ({ Editor }: any) => any;
};

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <CraftEditor
      onUpdate={(editor) => {
        onChange(editor?.getHTML());
      }}
      value={generateJSON(value, [StarterKit as any])}
    />
  );
}
